<?php

namespace App\Repositories\Order;

use App\Models\Order;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\BaseRepository;
use Carbon\Carbon;

class OrderRepo extends BaseRepository implements OrderRepositoryInterface
{
    public function getModel()
    {
        return Order::class;
    }
    public function createOrder($data, $id, $total_amount, $products)
    {
        $order = $this->model->create([
            'user_id' => $id,
            'payment_method' => $data['payment_method'],
            'recipient_name' => $data['recipient_name'],
            'recipient_phone' => $data['recipient_phone'],
            'recipient_address' => $data['recipient_address'],
            'total_amount' => $total_amount,
        ]);
        foreach ($products as $product) {
            $order->orderItems()->create([
                'product_variant_id' => $product['id'],
                'product_name' => $product['product']['product_name'],
                'product_thumbnail' => $product['product']['thumbnail'],
                'variant_attributes' => $product['attributes'],
                'quantity' => $product['quantity'],
                'unit_price' => $product['selling_price'],
                'total_amount' => $product['total_amount'],
            ]);
        }
        return $order->load('orderItems');
    }
    public function getMyOrders($idUser, $quantity, $status)
    {
        $statuss = ['Chờ xử lý', 'Đã xác nhận', 'Đang giao', 'Thành công', 'Đã hủy'];

        if (in_array($status, $statuss)) {
            return  $this->model->with('orderItems')
                ->where('user_id', $idUser)->where('order_status', $status)->latest()
                ->paginate($quantity);
        }
        return $this->model->with('orderItems')
            ->where('user_id', $idUser)->latest()
            ->paginate($quantity);
    }

    public function cancelOrder($id)
    {
        return $this->model
            ->where('id', $id)
            ->update([
                'order_status' => 'Đã hủy'
            ]);
    }
    public function findOrderWithItems($id)
    {
        return $this->model->with(['orderItems', 'user:id,full_name,email'])->findOrFail($id);
    }

    public function getStaffOrders($filters = [], $perPage = 10)
    {
        $query = $this->model->with(['orderItems', 'user:id,full_name,email'])->latest();

        // 1. Lọc theo trạng thái đơn hàng (order_status)
        if (!empty($filters['order_status'])) {
            $query->where('order_status', $filters['order_status']);
        }

        // 2. Lọc theo trạng thái thanh toán (payment_status)
        if (!empty($filters['payment_status'])) {
            $query->where('payment_status', $filters['payment_status']);
        }

        // 3. Tra cứu tìm kiếm (search): Mã đơn hàng, Tên người nhận, Số điện thoại
        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                if (is_numeric($search)) {
                    $q->orWhere('id', (int) $search);
                }
                $q->orWhere('recipient_name', 'like', "%{$search}%")
                    ->orWhere('recipient_phone', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage);
    }
    // tổng quan doanh thu
    public function getKpiSummary($startDate, $endDate)
    {
        $orderStats = $this->model::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("
                COALESCE(SUM(CASE WHEN order_status = 'Thành công' AND LOWER(payment_status) = 'paid' THEN total_amount ELSE 0 END), 0) AS total_revenue,
                COALESCE(SUM(CASE WHEN order_status = 'Đã hủy' THEN total_amount ELSE 0 END), 0) AS cancelled_amount,
                COUNT(CASE WHEN order_status = 'Thành công' AND LOWER(payment_status) = 'paid' THEN 1 END) AS completed_orders_count,
                COUNT(CASE WHEN order_status = 'Đã hủy' THEN 1 END) AS cancelled_orders_count,
                COUNT(id) AS total_orders_count
            ")
            ->first();
        // tổng giá vốn 
        $cogsData = \Illuminate\Support\Facades\DB::table('orders')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->where('orders.order_status', 'Thành công')
            ->whereRaw("LOWER(orders.payment_status) = 'paid'")
            ->selectRaw("COALESCE(SUM(order_items.quantity * COALESCE(product_variants.average_cost, 0)), 0) AS total_cogs")
            ->first();

        $totalRevenue = (float) ($orderStats->total_revenue ?? 0);
        $totalCogs = (float) ($cogsData->total_cogs ?? 0);
        $grossProfit = $totalRevenue - $totalCogs;
        return [
            'total_revenue' => $totalRevenue,
            'total_cogs' => $totalCogs,
            'gross_profit' => $grossProfit,
            'completed_orders_count' => (int) ($orderStats->completed_orders_count ?? 0),
            'cancelled_orders_count' => (int) ($orderStats->cancelled_orders_count ?? 0),
            'cancelled_amount' => (float) ($orderStats->cancelled_amount ?? 0),
            'total_orders_count' => (int) ($orderStats->total_orders_count ?? 0),
        ];
    }

  

    // Lấy phương thức thanh toán
    public function getPaymentMethodStats($startDate, $endDate)
    {
        return \Illuminate\Support\Facades\DB::table('orders')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('order_status', 'Thành công')
            ->whereRaw("LOWER(payment_status) = 'paid'")
            ->whereNull('deleted_at')
            ->selectRaw("
                payment_method,
                COALESCE(SUM(total_amount), 0) as revenue,
                COUNT(id) as orders_count
            ")
            ->groupBy('payment_method')
            ->get();
    }
    // lấy ra sản phẩm bán chạy
    public function getTopSellingProducts($startDate, $endDate, $limit = 5)
    {
        return $this->model
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->where('orders.order_status', 'Thành công')
            ->whereRaw("LOWER(orders.payment_status) = 'paid'")
            ->whereNull('orders.deleted_at')
            ->selectRaw("
            order_items.product_name,
            order_items.product_thumbnail,
            COALESCE(SUM(order_items.quantity), 0) as sold_quantity,
            COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) as revenue,
            COALESCE(SUM(order_items.quantity * (order_items.unit_price - product_variants.average_cost)), 0) as profit
        ")
            ->groupBy('order_items.product_name', 'order_items.product_thumbnail')
            ->orderByDesc('revenue')
            ->limit($limit)
            ->get();
    }

    // Doanh thu theo từng danh mục sản phẩm
    public function getRevenueByCategory($startDate, $endDate)
    {
        return $this->model
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->where('orders.order_status', 'Thành công')
            ->whereRaw("LOWER(orders.payment_status) = 'paid'")
            ->whereNull('orders.deleted_at')
            ->whereNull('product_variants.deleted_at')
            ->whereNull('products.deleted_at')
            ->whereNull('categories.deleted_at')
            ->selectRaw("
                categories.id,
                categories.name as category_name,
                COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) as revenue,
                COALESCE(SUM(order_items.quantity), 0) as total_quantity
            ")
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('revenue')
            ->get();
    }

    // Doanh thu theo từng thương hiệu
    public function getRevenueByBrand($startDate, $endDate)
    {
        return $this->model
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->join('brands', 'products.brand_id', '=', 'brands.id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->where('orders.order_status', 'Thành công')
            ->whereRaw("LOWER(orders.payment_status) = 'paid'")
            ->whereNull('orders.deleted_at')
            ->whereNull('product_variants.deleted_at')
            ->whereNull('products.deleted_at')
            ->whereNull('brands.deleted_at')
            ->selectRaw("
                brands.id,
                brands.name as brand_name,
                COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) as revenue,
                COALESCE(SUM(order_items.quantity), 0) as total_quantity
            ")
            ->groupBy('brands.id', 'brands.name')
            ->orderByDesc('revenue')
            ->get();
    }
}

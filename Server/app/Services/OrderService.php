<?php

namespace app\Services;

use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderService
{
    protected $productVariantRepo;
    protected $orderRepo;
    public function __construct(ProductVariantRepoInter $productVariantRepo, OrderRepositoryInterface $orderRepo)
    {
        $this->productVariantRepo  = $productVariantRepo;
        $this->orderRepo = $orderRepo;
    }
    // trả về true nếu số lượng mua > số lượng kho 
    public function hasEnoughStock($ids, $productVariant)
    {
        $quantityRepo = $this->productVariantRepo->getQuantitys($ids);

        foreach ($productVariant as $item) {
            $id = $item['id'];
            if ($item['quantity'] > $quantityRepo[$id]) {
                return true;
            }
        }
        return false;
    }
    public function checkout($productVariant)
    {
        $ids = array_column($productVariant, 'id');
        if ($this->hasEnoughStock($ids, $productVariant)) {
            return false;
        };
        $quantityMap = array_column($productVariant, 'quantity', 'id');
        $product = $this->productVariantRepo->getProductVariants($ids);
        foreach ($product as &$item) {
            $id = $item['id'];
            $item['quantity'] = $quantityMap[$id];
        }
        unset($item);
        return $product;
    }
    public function createOrder($data, $idUser)
    {

        $ids = array_column($data['idQuantities'], 'id');

        $quantityMap = array_column($data['idQuantities'], 'quantity', 'id');

        return  DB::transaction(function () use ($data, $ids, $quantityMap, $idUser) {
            //Trừ số lượng trong kho
            $this->productVariantRepo->decreaseStock($data['idQuantities']);
            // Lấy ra thông tin sản phẩm
            $productInfomation = $this->productVariantRepo->getProductVariants($ids);
            $total_amount = 0;
            foreach ($productInfomation as &$item) {
                $id = $item['id'];
                $item['quantity'] = $quantityMap[$id];
                $item['total_amount'] = $item['quantity'] * $item['selling_price'];
                $total_amount +=  $item['total_amount'];
            }
            unset($item);
            // Tạo đơn hàng

            return  $this->orderRepo->createOrder($data, $idUser, $total_amount, $productInfomation);
        });
    }
    public function index($idUser, $quantity)
    {
        $status = request()->query('status');
        return $this->orderRepo->getMyOrders($idUser, $quantity, $status);
    }

    public function cancelOrder($id)
    {
        $order = $this->orderRepo->findOrderWithItems($id);
        if ($order->order_status != "Chờ xử lý") {
            return false;
        }
        $orderItems = $order->orderItems;
        return DB::transaction(function () use ($orderItems, $order) {

            $this->productVariantRepo->increaseStock($orderItems);
            $order->order_status = 'Đã hủy';
            $order->save();
            return true;
        });
    }

    public function getStaffOrders($filters = [], $perPage = 10)
    {
        return $this->orderRepo->getStaffOrders($filters, $perPage);
    }

    public function getStaffOrderDetail($id)
    {
        return $this->orderRepo->findOrderWithItems($id);
    }

    public function updateOrderStatus($id, $newStatus, $newPaymentStatus = null)
    {
        $order = $this->orderRepo->findOrderWithItems($id);
        $oldStatus = $order->order_status;

        return DB::transaction(function () use ($order, $oldStatus, $newStatus, $newPaymentStatus) {
            // 1. Chuyển sang "Đã hủy" từ trạng thái đang hoạt động => Hoàn trả lại tồn kho
            if ($oldStatus !== 'Đã hủy' && $newStatus === 'Đã hủy') {
                $this->productVariantRepo->increaseStock($order->orderItems);
            }
            // 2. Kích hoạt lại đơn hàng từ "Đã hủy" về trạng thái đặt => Trừ lại số lượng tồn kho
            elseif ($oldStatus === 'Đã hủy' && $newStatus !== 'Đã hủy') {
                $this->productVariantRepo->decreaseStock($order->orderItems);
            }

            $order->order_status = $newStatus;
            if (!empty($newPaymentStatus)) {
                $order->payment_status = $newPaymentStatus;
            }
            $order->save();

            return $order->load(['orderItems', 'user:id,full_name,email']);
        });
    }
}

<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Events\OrderUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderCreateValidation;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;
    public function __construct(OrderService $order)
    {
        $this->orderService = $order;
    }


    // check số lượng + trả api đặt hàng
    public function checkout(Request $request)
    {
        $productVariant = $request->productVariant;
        $check = $this->orderService->checkout($productVariant);
        if (!$check) {
            return [
                'type' => 'error',
                'message' => "Số lượng mua không hợp lệ"
            ];
        }
        return [
            'type' => 'success',
            'products' => $check,
        ];
    }
    // trang giao diện đơn hàng của user
    public function index()
    {
        $orders = $this->orderService->index(auth()->id(), 10);
        return response()->json($orders);
    }

    //    Tạo đơn hàng
    public function store(OrderCreateValidation $request)
    {
        $request->validated();
        try {
            $order = $this->orderService->createOrder($request->all(), Auth::id());
            event(new OrderCreated($order));
            return response()->json([
                'message' => "Tạo đơn hàng thành công",
                'type' => 'success',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'type' => 'error'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function cancelOrder(string $id)
    {
        try {
            $result = $this->orderService->cancelOrder($id);
            if ($result) {
                return response()->json([
                    "type" => "success",
                    "message" => "Hủy đơn hàng thành công"
                ]);
            }
            event(new OrderUpdated());
            return response()->json([
                "type" => "warning",
                "message" => "Đơn hàng không thể hủy"
            ]);
        } catch (\Exception $error) {
            return response()->json([
                "type" => "error",
                "message" => $error->getMessage()
            ]);
        }
    }

    /**
     * Danh sách đơn hàng cho Staff & Admin (có tìm kiếm, lọc trạng thái, phân trang server)
     */
    public function staffOrders(Request $request)
    {
        $filters = $request->only(['search', 'order_status', 'payment_status']);
        $perPage = (int) $request->query('per_page', 10);
        $orders = $this->orderService->getStaffOrders($filters, $perPage);

        return response()->json($orders);
    }

 
    public function staffOrderDetail(string $id)
    {
        try {
            $order = $this->orderService->getStaffOrderDetail($id);
            return response()->json($order);
        } catch (\Throwable $e) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy đơn hàng #' . $id,
            ], 404);
        }
    }

    /**
     * Cập nhật trạng thái đơn hàng kèm đồng bộ kho (hoàn trả khi hủy, trừ khi kích hoạt lại)
     */
    public function updateOrderStatus(Request $request, string $id)
    {
        $request->validate([
            'order_status' => 'required|in:Chờ xử lý,Đã xác nhận,Đang giao,Thành công,Đã hủy',
            'payment_status' => 'nullable|in:Unpaid,Paid',
        ], [
            'order_status.required' => 'Vui lòng chọn trạng thái đơn hàng.',
            'order_status.in' => 'Trạng thái đơn hàng không hợp lệ.',
            'payment_status.in' => 'Trạng thái thanh toán không hợp lệ.',
        ]);

        try {
            $order = $this->orderService->updateOrderStatus(
                $id,
                $request->order_status,
                $request->payment_status
            );
            event(new OrderUpdated());
            return response()->json([
                'type' => 'success',
                'message' => 'Cập nhật trạng thái đơn hàng thành công!',
                'data' => $order,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'type' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}

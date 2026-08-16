<?php

namespace App\Http\Controllers;

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
            $this->orderService->createOrder($request->all(), Auth::id());
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
}

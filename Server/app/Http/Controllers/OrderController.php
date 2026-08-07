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
    public function index()
    {
        //
    }

    //    Tạo đơn hàng
    public function store(OrderCreateValidation $request)
    {
        $request->validated();
        return response()->json($this->orderService->createOrder($request->all(), Auth::id()));
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
    public function destroy(string $id)
    {
        //
    }
}

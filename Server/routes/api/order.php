<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::post("/checkout", [OrderController::class, 'checkout']);
    Route::post("/orders", [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::patch('/orders/{id}', [OrderController::class, 'cancelOrder']);

    // Phân hệ quản lý đơn hàng dành cho Nhân viên sale và Quản trị viên
    Route::middleware('role:Nhân viên sale,Quản trị viên')->group(function () {
        Route::get('/staff/orders', [OrderController::class, 'staffOrders']);
        Route::get('/staff/orders/{id}', [OrderController::class, 'staffOrderDetail']);
        Route::put('/staff/orders/{id}/status', [OrderController::class, 'updateOrderStatus']);
    });
});

<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::post("/checkout", [OrderController::class, 'checkout']);

    Route::post("/orders", [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::PATCH('/orders/{id}', [OrderController::class, 'cancelOrder']);
});

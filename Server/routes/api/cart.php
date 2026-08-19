<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::post('/carts', [CartController::class, 'store']);
    Route::get('/carts', [CartController::class, 'index']);
    Route::delete('/carts/{id}', [CartController::class, 'destroy']);
});

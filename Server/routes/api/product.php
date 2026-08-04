<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;

Route::get('/products/{slug}', [ProductController::class, 'productDetail']);

//Đánh giá sản phẩm
Route::get('products/{product:slug}/reviews',[ReviewController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::post('/products/{slug}/reviews', [ReviewController::class, 'store']);
});

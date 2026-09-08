<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;

Route::get('/products', [ProductController::class, 'productSearch']);
Route::get('/products/sale', [ProductController::class, 'productSale']);
Route::get('/products/new', [ProductController::class, 'productNew']);
Route::get('/products/{slug}', [ProductController::class, 'productDetail']);

Route::get("brands/{brand}/products", [ProductController::class, 'productsByBrand']);
//Đánh giá sản phẩm


Route::middleware('auth:api')->group(function () {
    Route::get('products/{product:slug}/reviews', [ReviewController::class, 'index']);
    Route::post('/products/{slug}/reviews', [ReviewController::class, 'store']);
    Route::delete('/products/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::middleware('role:Nhân viên kho,Quản trị viên')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
    });
});

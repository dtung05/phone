<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;

// Public product routes
Route::get('/products', [ProductController::class, 'productSearch']);
Route::get('/products/sale', [ProductController::class, 'productSale']);
Route::get('/products/new', [ProductController::class, 'productNew']);
Route::get('/products/{slug}', [ProductController::class, 'productDetail']);
Route::get("brands/{brand}/products", [ProductController::class, 'productsByBrand']);
Route::get('products/{product:slug}/reviews', [ReviewController::class, 'index']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Khách hàng gửi và xóa đánh giá
    Route::post('/products/{slug}/reviews', [ReviewController::class, 'store']);
    Route::delete('/products/reviews/{id}', [ReviewController::class, 'destroy']);

    // Staff/Admin routes
    Route::middleware('role:Nhân viên kho,Nhân viên sale,Quản trị viên')->group(function () {
        // Quản lý sản phẩm
        Route::get('/staff/products', [ProductController::class, 'staffProducts']);
        Route::get('/staff/products/{id}', [ProductController::class, 'staffProductDetail']);
        Route::get('/staff/variants', [ProductController::class, 'staffVariants']);
        Route::post('/staff/products', [ProductController::class, 'store']);
        Route::post('/staff/products/{id}', [ProductController::class, 'update']);
        Route::patch('/staff/products/{id}/toggle-sale', [ProductController::class, 'toggleSale']);

        // Quản lý đánh giá & phản hồi bình luận
        Route::get('/staff/reviews', [ReviewController::class, 'staffIndex']);
        Route::get('/staff/reviews/unreplied-count', [ReviewController::class, 'unrepliedCount']);
        Route::post('/staff/reviews/{id}/reply', [ReviewController::class, 'reply']);
        Route::delete('/staff/reviews/{id}', [ReviewController::class, 'destroy']);
        Route::delete('/staff/reviews/replies/{id}', [ReviewController::class, 'destroyReply']);
    });
});

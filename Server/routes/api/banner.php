<?php

use App\Http\Controllers\BannerController;
use Illuminate\Support\Facades\Route;

Route::get('/banners', [BannerController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::middleware('role:Nhân viên kho,Nhân viên sale,Quản trị viên')->group(function () {
        Route::get('/staff/banners', [BannerController::class, 'staffIndex']);
        Route::get('/staff/banners/{id}', [BannerController::class, 'show']);
        Route::post('/staff/banners', [BannerController::class, 'store']);
        Route::post('/staff/banners/{id}', [BannerController::class, 'update']);
        Route::patch('/staff/banners/{id}/toggle-active', [BannerController::class, 'toggleActive']);
        Route::delete('/staff/banners/{id}', [BannerController::class, 'destroy']);
    });
});

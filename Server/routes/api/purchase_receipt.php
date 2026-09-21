<?php

use App\Http\Controllers\PurchaseReceiptController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::middleware('role:Nhân viên kho,Quản trị viên,Nhân viên sale')->group(function () {
        // Quản lý nhà cung ứng
        Route::get('/staff/suppliers', [SupplierController::class, 'index']);
        Route::post('/staff/suppliers', [SupplierController::class, 'store']);
        Route::get('/staff/suppliers/{id}', [SupplierController::class, 'show']);
        Route::put('/staff/suppliers/{id}', [SupplierController::class, 'update']);
        Route::delete('/staff/suppliers/{id}', [SupplierController::class, 'destroy']);

        // Quản lý phiếu nhập kho
        Route::get('/staff/purchase-receipts', [PurchaseReceiptController::class, 'index']);
        Route::post('/staff/purchase-receipts', [PurchaseReceiptController::class, 'store']);
        Route::get('/staff/purchase-receipts/{id}', [PurchaseReceiptController::class, 'show']);
    });
});

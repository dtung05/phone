<?php

use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;

Route::get('/brands', [BrandController::class, 'index']);

Route::middleware(['auth:api', 'role:Nhân viên kho,Quản trị viên'])->group(function () {
    Route::get('/brands/trashed', [BrandController::class, 'trashed']);
    Route::post('/brands', [BrandController::class, 'store']);
    Route::post('/brands/{id}/restore', [BrandController::class, 'restore']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
});

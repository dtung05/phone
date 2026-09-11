<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware(['auth:api', 'role:Nhân viên kho,Quản trị viên'])->group(function () {
    Route::get('/categories/trashed', [CategoryController::class, 'trashed']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::post('/categories/{id}/restore', [CategoryController::class, 'restore']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});

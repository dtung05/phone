<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:Quản trị viên'])->group(function () {
    Route::get('/staff/users', [UserController::class, 'index']);// danh sách trang
    Route::get('/staff/users/{id}', [UserController::class, 'show']); // trang chi tiết
    Route::post('/staff/users', [UserController::class, 'store']);  // tạo tài khoản nhân viên
    Route::put('/staff/users/{id}', [UserController::class, 'update']); // cập nhật trạng thái
    Route::patch('/staff/users/{id}/toggle-status', [UserController::class, 'toggleStatus']);// thay đổi khóa mở tài khoản
});

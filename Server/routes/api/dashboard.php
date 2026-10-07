<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:Quản trị viên'])->group(function () {
    Route::get("/staff/dashboard", [DashboardController::class, 'index']);
});

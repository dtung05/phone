<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/payment/{payment}/return', [PaymentController::class, 'PayReturn']);
Route::get('/payment/{payment}/ipn', [PaymentController::class, 'PayIpn']);
Route::get('/payment/{payment}/{id}', [PaymentController::class, 'HandlePayment']);

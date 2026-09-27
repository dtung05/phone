<?php

namespace App\Contracts;

use App\DTOs\PaymentResult;
use Illuminate\Http\Request;

interface PaymentInterface
{
    // tạo mã thanh toán
    public function createPayment($order): string; 
// trả về font
    public function handleReturn(Request $request): PaymentResult;
// trả về payment
    public function handleIpn(Request $request): PaymentResult;
// đoạn mã xử lý gom dữ liệu
    public function formatIpnResponse(array $orderProcessResult);
}
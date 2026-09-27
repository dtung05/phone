<?php

namespace App\Factory;
use App\Contracts\PaymentInterface;
use App\Services\Payments\VnPay;

class PaymentFactory
{
    protected array $gateways = [
        'vnpay' => VnPay::class,
    ];

    public function make(string $pay): PaymentInterface
    {
        $gatewayClass = $this->gateways[strtolower($pay)] ?? null;
        if (!$gatewayClass || !class_exists($gatewayClass)) {
            throw new \InvalidArgumentException("Phương thức thanh toán không hợp lệ: {$pay}");
        }
        $gateway = app()->make($gatewayClass);
        // kiểm tra xem interface chưa
        if (!$gateway instanceof PaymentInterface) {
            throw new \LogicException("Cổng thanh toán {$gatewayClass} phải implement PaymentInterface.");
        }
        return $gateway;
    }
}

<?php

namespace App\DTOs;

class PaymentResult
{
    public function __construct(
        public bool $isValidSignature,
        public bool $isSuccess,
        public ?int $orderId,
        public float $amount,
        public ?string $transactionId = null,
        public ?string $message = null,
        public array $rawResponse = []
    ) {}
}

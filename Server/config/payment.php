<?php

return [
    'vnpay' => [
        'tmn_code' => env('VNPAY_TMN_CODE'),
        'hash_secret' => env('VNPAY_HASH_SECRET'),
        'url' => env('VNPAY_URL'),
        'return_url' => env('VNPAY_RETURN_URL'),
    ],
];
// cloudflared tunnel --url http://localhost:8000


// $tmnCode = config('payment.vnpay.tmn_code');
// $hashSecret = config('payment.vnpay.hash_secret');
// $url = config('payment.vnpay.url');
// $returnUrl = config('payment.vnpay.return_url');
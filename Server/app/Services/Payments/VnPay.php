<?php

namespace App\Services\Payments;

use App\Contracts\PaymentInterface;
use App\DTOs\PaymentResult;
use Illuminate\Http\Request;

class VnPay implements PaymentInterface
{
    public function createPayment($order): string
    {
        // VNPay yêu cầu múi giờ GMT+7
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_TxnRef = $order->id;
        $vnp_Amount = $order->total_amount;
        $vnp_Locale = 'vn';
        $vnp_IpAddr = request()->ip();

        $inputData = [
            'vnp_Version' => '2.1.0',
            'vnp_TmnCode' => config('payment.vnpay.tmn_code'),
            'vnp_Amount' => (int) $vnp_Amount * 100,
            'vnp_Command' => 'pay',
            'vnp_CreateDate' => date('YmdHis'),
            'vnp_CurrCode' => 'VND',
            'vnp_IpAddr' => $vnp_IpAddr,
            'vnp_Locale' => $vnp_Locale,
            'vnp_OrderInfo' => 'Thanh toan don hang ' . $order->id,
            'vnp_OrderType' => 'other',
            'vnp_ReturnUrl' => config('payment.vnpay.return_url'),
            'vnp_TxnRef' => (string) $vnp_TxnRef,
            'vnp_ExpireDate' => date('YmdHis', strtotime('+15 minutes')),
        ];

        ksort($inputData);
        $hashData = '';
        $query = '';
        foreach ($inputData as $key => $value) {
            $hashData .= urlencode($key) . '=' . urlencode($value) . '&';
            $query .= urlencode($key) . '=' . urlencode($value) . '&';
        }
        $hashData = rtrim($hashData, '&');
        $query = rtrim($query, '&');
        $hashSecret = config('payment.vnpay.hash_secret');
        $secureHash = hash_hmac('sha512', $hashData, $hashSecret);

        return config('payment.vnpay.url') . '?' . $query . '&vnp_SecureHash=' . $secureHash;
    }

    public function handleIpn(Request $request): PaymentResult
    {
        $inputData = [];
        foreach ($request->query() as $key => $value) {
            if (str_starts_with($key, 'vnp_')) {
                $inputData[$key] = $value;
            }
        }
        $vnp_SecureHash = $inputData['vnp_SecureHash'] ?? '';
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);

        $i = 0;
        $hashData = '';
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . '=' . urlencode($value);
            } else {
                $hashData .= urlencode($key) . '=' . urlencode($value);
                $i = 1;
            }
        }
        $hashSecret = config('payment.vnpay.hash_secret');
        $secureHash = hash_hmac('sha512', $hashData, $hashSecret);

        $isValidSignature = ($secureHash === $vnp_SecureHash);
        $responseCode = $request->get('vnp_ResponseCode');
        $transactionStatus = $request->get('vnp_TransactionStatus');

        $isSuccess = ($isValidSignature && $responseCode === '00' && $transactionStatus === '00');
        $orderId = $request->has('vnp_TxnRef') ? (int) $request->get('vnp_TxnRef') : null;
        $amount = $request->has('vnp_Amount') ? (float) ($request->get('vnp_Amount') / 100) : 0;
        $transactionId = $request->get('vnp_TransactionNo');
        return new PaymentResult(
            isValidSignature: $isValidSignature,
            isSuccess: $isSuccess,
            orderId: $orderId,
            amount: $amount,
            transactionId: $transactionId,
            message: $isSuccess ? 'Giao dịch thành công' : 'Giao dịch không thành công',
            rawResponse: $request->query()
        );
    }

    public function handleReturn(Request $request): PaymentResult
    {
        return $this->handleIpn($request);
    }

    public function formatIpnResponse(array $orderProcessResult)
    {
        $status = $orderProcessResult['status'] ?? 'ERROR';
        $mapping = [
            'SUCCESS'          => ['RspCode' => '00', 'Message' => 'Confirm Success'],
            'ORDER_NOT_FOUND'  => ['RspCode' => '01', 'Message' => 'Order not found'],
            'ALREADY_PAID'     => ['RspCode' => '02', 'Message' => 'Order already confirmed'],
            'INVALID_AMOUNT'   => ['RspCode' => '04', 'Message' => 'Invalid amount'],
            'SIGNATURE_FAILED' => ['RspCode' => '97', 'Message' => 'Invalid Checksum'],
            'PAYMENT_FAILED'   => ['RspCode' => '00', 'Message' => 'Confirm Success'],
        ];
        return response()->json($mapping[$status] ?? ['RspCode' => '99', 'Message' => 'Unknown error']);
    }
}

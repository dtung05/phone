<?php

namespace App\Http\Controllers;

use App\Factory\PaymentFactory;
use App\Services\OrderService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentFactory;
    protected $orderService;

    public function __construct(
        PaymentFactory $paymentFactory,
        OrderService $orderService
    ) {
        $this->paymentFactory = $paymentFactory;
        $this->orderService = $orderService;
    }

    public function HandlePayment(string $payment, int $id)
    {
        $order = $this->orderService->findOrderId($id);
        if (!$order) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy đơn hàng.'
            ], 404);
        }
        if ($order->order_status === "Đã hủy") {
            return response()->json([
                'type' => "error",
                'message' => "Đơn hàng đã hủy, không thể thanh toán."
            ]);
        }
        if ($order->payment_method !== $payment) {
            return response()->json([
                'type' => "error",
                'message' => "Phương thức thanh toán không hợp lệ."
            ]);
        }
        $url = $this->paymentFactory->make($payment)->createPayment($order);
        return response()->json([
            'type' => 'success',
            'url' => $url
        ]);
    }
    public function PayReturn(string $payment, Request $request)
    {
        $gateway = $this->paymentFactory->make($payment);
        $result = $gateway->handleReturn($request);
        $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
        $status = ($result->isValidSignature && $result->isSuccess) ? 'success' : 'error';
        return redirect("{$frontendUrl}/payment/result?order_id={$result->orderId}&status={$status}");
    }

    public function PayIpn(string $payment, Request $request)
    {
        $gateway = $this->paymentFactory->make($payment);
        $paymentResult = $gateway->handleIpn($request);
        //Kiểm tra chữ ký 
        if (!$paymentResult->isValidSignature) {
            return $gateway->formatIpnResponse(['status' => 'SIGNATURE_FAILED']);
        }
        // kiểm tra đơn hàng
        if ($paymentResult->orderId === null) {
            return $gateway->formatIpnResponse(['status' => 'ORDER_NOT_FOUND']);
        }
        // gọi xử lý cập nhật đơn hàng
        $orderProcessResult = $this->orderService->processPaymentResult(
            (int) $paymentResult->orderId,
            (float) $paymentResult->amount,
            (bool) $paymentResult->isSuccess
        );
        // Trả về ipn cho bên payment
        return $gateway->formatIpnResponse($orderProcessResult);
    }
}

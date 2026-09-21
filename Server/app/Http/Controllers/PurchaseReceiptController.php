<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\PurchaseReceiptService;
use Illuminate\Http\Request;

class PurchaseReceiptController extends Controller
{
    protected $purchaseReceiptService;

    public function __construct(PurchaseReceiptService $purchaseReceiptService)
    {
        $this->purchaseReceiptService = $purchaseReceiptService;
    }

    /**
     * Danh sách phiếu nhập kho phân trang & tìm kiếm
     */
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'supplier_id' => $request->query('supplier_id'),
            'from_date' => $request->query('from_date'),
            'to_date' => $request->query('to_date'),
        ];

        $perPage = (int) $request->query('per_page', 10);
        $receipts = $this->purchaseReceiptService->getReceipts($filters, $perPage);

        return response()->json($receipts);
    }

    /**
     * Chi tiết phiếu nhập kho (cho trang chi tiết & in ấn)
     */
    public function show($id)
    {
        $receipt = $this->purchaseReceiptService->getReceiptDetail($id);

        if (!$receipt) {
            return response()->json([
                'type' => 'error',
                'message' => 'Không tìm thấy phiếu nhập kho #' . $id,
            ], 404);
        }

        return response()->json($receipt);
    }

    /**
     * Lập phiếu nhập kho & tính lại giá vốn bình quân di động cho biến thể
     */
    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'nullable|exists:suppliers,id',
            'received_at' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.note' => 'nullable|string|max:500',
        ], [
            'received_at.required' => 'Vui lòng chọn ngày nhập kho.',
            'items.required' => 'Vui lòng chọn ít nhất một biến thể sản phẩm cần nhập kho.',
            'items.min' => 'Vui lòng chọn ít nhất một biến thể sản phẩm cần nhập kho.',
            'items.*.product_variant_id.required' => 'Biến thể sản phẩm không hợp lệ.',
            'items.*.quantity.min' => 'Số lượng nhập phải lớn hơn 0.',
            'items.*.unit_price.min' => 'Đơn giá vốn nhập không được âm.',
        ]);

        try {
            $receiptData = [
                'employee_id' => auth()->id() ?? 1,
                'supplier_id' => $request->supplier_id,
                'received_at' => $request->received_at,
            ];

            $result = $this->purchaseReceiptService->createPurchaseReceipt($receiptData, $request->items);

            return response()->json([
                'type' => 'success',
                'message' => 'Lập phiếu nhập kho và tính lại giá vốn bình quân thành công!',
                'data' => $result,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'type' => 'error',
                'message' => 'Đã có lỗi xảy ra khi lập phiếu nhập kho: ' . $e->getMessage(),
            ], 500);
        }
    }
}

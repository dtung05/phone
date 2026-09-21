<?php

namespace App\Services;

use App\Repositories\ProductVariant\ProductVariantRepoInter;
use App\Repositories\PurchaseReceipt\PurchaseReceiptRepoInter;
use Exception;
use Illuminate\Support\Facades\DB;

class PurchaseReceiptService
{
    protected $purchaseReceiptRepo;
    protected $productVariantRepo;
    public function __construct(
        PurchaseReceiptRepoInter $purchaseReceiptRepo,
        ProductVariantRepoInter $productVariantRepo
    ) {
        $this->purchaseReceiptRepo = $purchaseReceiptRepo;
        $this->productVariantRepo = $productVariantRepo;
    }


    public function getReceipts(array $filters = [], int $perPage = 10)
    {
        return $this->purchaseReceiptRepo->getReceipts($filters, $perPage);
    }

    /**
     * Lấy thông tin chi tiết phiếu nhập kho
     */
    public function getReceiptDetail(int $id)
    {
        return $this->purchaseReceiptRepo->getReceiptDetail($id);
    }

    /**
     * Thuật toán tính Giá Vốn Bình Quân Gia Quyền Di Động (Moving Average Cost)
     *$currentQty Số lượng tồn kho hiện tại của biến thể
     *$currentCost Giá vốn bình quân hiện tại
     *$importQty Số lượng nhập thêm trong phiếu
     *$importPrice Đơn giá vốn nhập đợt này
     *Giá vốn bình quân mới
     */
    public function calculateMovingAverageCost(int $currentQty, float $currentCost, int $importQty, float $importPrice): float
    {
        if ($currentQty <= 0 || $currentCost <= 0) {
            return $importPrice;
        }

        $oldTotalValue = $currentQty * $currentCost;
        $newImportValue = $importQty * $importPrice;
        $newTotalQty = $currentQty + $importQty;

        return round(($oldTotalValue + $newImportValue) / $newTotalQty);
    }


    public function createPurchaseReceipt(array $receiptData, array $items)
    {
        return DB::transaction(function () use ($receiptData, $items) {
            $receipt = $this->purchaseReceiptRepo->create([
                'employee_id' => $receiptData['employee_id'] ?? (auth()->id() ?? 1),
                'supplier_id' => $receiptData['supplier_id'] ?? null,
                'received_at' => $receiptData['received_at'] ?? now(),
                'total_amount' => 0,
            ]);
            $totalAmount = 0;

            foreach ($items as $itemData) {
                $variantId = $itemData['product_variant_id'];
                // lấy ra sản phẩm
                $variant = $this->productVariantRepo->findWithLock($variantId);
                if (!$variant) {
                    throw new Exception("Không tìm thấy thông tin biến thể sản phẩm #{$variantId}.");
                }
                $importQty = (int) $itemData['quantity'];
                $importPrice = (float) $itemData['unit_price'];
                $currentQty = (int) $variant->stock_quantity;
                $currentCost = (float) $variant->average_cost;
                //TÍnh lại giá vốn
                $newAvgCost = $this->calculateMovingAverageCost(
                    $currentQty,
                    $currentCost,
                    $importQty,
                    $importPrice
                );
                $newStockQty = max(0, $currentQty) + $importQty;
                $this->productVariantRepo->updateCostAndStock($variant->id, $newAvgCost, $newStockQty);
                $itemTotal = $importQty * $importPrice;
                $totalAmount += $itemTotal;
                //Lưu lại
                $this->purchaseReceiptRepo->createItem([
                    'purchase_receipt_id' => $receipt->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $importQty,
                    'unit_price' => $importPrice,
                    'total_amount' => $itemTotal,
                    'note' => $itemData['note'] ?? null,
                ]);
            }

            $this->purchaseReceiptRepo->updateTotalAmount($receipt->id, $totalAmount);

            return [
                'receipt' => $this->purchaseReceiptRepo->getReceiptDetail($receipt->id),

            ];
        });
    }
}

<?php

namespace App\Repositories\PurchaseReceipt;

use App\Repositories\RepositoryInterface;

interface PurchaseReceiptRepoInter extends RepositoryInterface
{
    /**
     * Truy vấn danh sách phiếu nhập kho phân trang & bộ lọc
     */
    public function getReceipts(array $filters = [], int $perPage = 10);

    /**
     * Truy vấn chi tiết phiếu nhập kho kèm các quan hệ liên quan
     */
    public function getReceiptDetail(int $id);

    /**
     * Tạo dòng chi tiết sản phẩm cho phiếu nhập kho
     */
    public function createItem(array $attributes);

    /**
     * Cập nhật tổng tiền cho phiếu nhập kho
     */
    public function updateTotalAmount(int $id, float $totalAmount);
}

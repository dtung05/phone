<?php

namespace App\Repositories\Supplier;

use App\Repositories\RepositoryInterface;

interface SupplierRepoInter extends RepositoryInterface
{
    /**
     * Lấy toàn bộ nhà cung cấp (cho dropdown lựa chọn)
     */
    public function getAllSuppliers();

    /**
     * Lấy danh sách nhà cung cấp phân trang kèm tìm kiếm và thống kê số phiếu nhập
     */
    public function getPaginatedSuppliers(array $filters = [], int $perPage = 10);

    /**
     * Lấy chi tiết nhà cung cấp kèm lịch sử phiếu nhập gần nhất
     */
    public function getSupplierDetail(int $id);

    /**
     * Kiểm tra và xóa nhà cung cấp (ngăn xóa nếu đã có phiếu nhập)
     */
    public function deleteSupplierSafe(int $id);
}

<?php

namespace App\Repositories\Supplier;

use App\Models\Supplier;
use App\Repositories\BaseRepository;

class SupplierRepo extends BaseRepository implements SupplierRepoInter
{
    public function getModel()
    {
        return Supplier::class;
    }

    /**
     * Lấy toàn bộ nhà cung cấp sắp xếp theo tên
     */
    public function getAllSuppliers()
    {
        return $this->model->orderBy('company_name', 'asc')->get();
    }

    
    //   Lấy danh sách nhà cung cấp phân trang kèm tìm kiếm và số lượng phiếu nhập
   
    public function getPaginatedSuppliers(array $filters = [], int $perPage = 10)
    {
        $query = $this->model->withCount('purchaseReceipts');

        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                    ->orWhere('phone_number', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }
        $sortBy = $filters['sort_by'] ?? 'id';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        return $query->orderBy($sortBy, $sortOrder)->paginate($perPage);
    }

    /**
     * Lấy chi tiết nhà cung cấp kèm thông tin thống kê & các phiếu nhập gần nhất
     */
    public function getSupplierDetail(int $id)
    {
        return $this->model->withCount('purchaseReceipts')
            ->with(['purchaseReceipts' => function ($q) {
                $q->latest('received_at')->take(5);
            }])
            ->find($id);
    }

    /**
     * Xóa an toàn nhà cung cấp: chặn xóa nếu đã có phiếu nhập kho phát sinh
     */
    public function deleteSupplierSafe(int $id)
    {
        $supplier = $this->find($id);
        if (!$supplier) {
            return [
                'success' => false,
                'message' => 'Không tìm thấy nhà cung cấp cần xóa.',
                'code' => 404,
            ];
        }
        // Kiểm tra xem đã có phiếu nhập kho nào liên kết với nhà cung cấp này chưa
        if ($supplier->purchaseReceipts()->exists()) {
            return [
                'success' => false,
                'message' => 'Không thể xóa nhà cung cấp đã phát sinh phiếu nhập kho trong hệ thống.',
                'code' => 400,
            ];
        }
        $supplier->delete();
        return [
            'success' => true,
            'message' => 'Xóa nhà cung cấp thành công.',
            'code' => 200,
        ];
    }
}

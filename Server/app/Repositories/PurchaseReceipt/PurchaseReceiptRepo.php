<?php

namespace App\Repositories\PurchaseReceipt;

use App\Models\PurchaseReceipt;
use App\Models\PurchaseReceiptItem;
use App\Repositories\BaseRepository;

class PurchaseReceiptRepo extends BaseRepository implements PurchaseReceiptRepoInter
{
    public function getModel()
    {
        return PurchaseReceipt::class;
    }

    /**
     * Truy vấn danh sách phiếu nhập kho phân trang & bộ lọc
     */
    public function getReceipts(array $filters = [], int $perPage = 10)
    {
        $query = $this->model->with([
            'supplier:id,company_name,phone_number',
            'employee:id,full_name',
            'items',
        ]);

        if (!empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                    ->orWhereHas('supplier', function ($sq) use ($search) {
                        $sq->where('company_name', 'like', "%{$search}%");
                    });
            });
        }

        if (!empty($filters['supplier_id'])) {
            $query->where('supplier_id', $filters['supplier_id']);
        }

        if (!empty($filters['from_date'])) {
            $query->whereDate('received_at', '>=', $filters['from_date']);
        }

        if (!empty($filters['to_date'])) {
            $query->whereDate('received_at', '<=', $filters['to_date']);
        }

        return $query->orderBy('id', 'desc')->paginate($perPage);
    }


    public function getReceiptDetail(int $id)
    {
        return $this->model->with([
            'supplier',
            'employee:id,full_name,email',
            'items.productVariant.product:id,product_name,thumbnail,category_id,brand_id',
            'items.productVariant.product.brand:id,name',
            'items.productVariant.product.category:id,name',
        ])->find($id);
    }

    // lưu từng bảng item
    public function createItem(array $attributes)
    {
        return PurchaseReceiptItem::create($attributes);
    }

    /**
     * Cập nhật tổng tiền cho phiếu nhập kho
     */
    public function updateTotalAmount(int $id, float $totalAmount)
    {
        return $this->model->where('id', $id)->update(['total_amount' => $totalAmount]);
    }
}

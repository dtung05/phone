<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PurchaseReceiptSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $employeeIds = DB::table('users')
            ->whereIn('role', ['Nhân viên kho', 'Quản trị viên'])
            ->pluck('id')
            ->toArray();

        $supplierIds = DB::table('suppliers')->pluck('id')->toArray();

        $variants = DB::table('product_variants')->select('id', 'average_cost', 'selling_price')->get()->toArray();

        if (empty($employeeIds) || empty($supplierIds) || empty($variants)) {
            return;
        }

        $receiptNotes = [
            'Nhập hàng chính hãng đợt 1',
            'Nhập bổ sung lượng tồn kho theo kế hoạch tháng',
            'Lô hàng nguyên seal mới 100%, bảo hành 12 tháng',
            'Nhập khẩn cấp phục vụ chiến dịch khuyến mãi',
            'Hàng nhập khẩu chính ngạch từ nhà phân phối',
        ];

        for ($r = 1; $r <= 20; $r++) {
            $receivedDate = Carbon::now()->subDays(rand(1, 90))->format('Y-m-d');
            $employeeId = $employeeIds[array_rand($employeeIds)];
            $supplierId = $supplierIds[array_rand($supplierIds)];

            $receiptId = DB::table('purchase_receipts')->insertGetId([
                'employee_id'  => $employeeId,
                'supplier_id'  => $supplierId,
                'received_at'  => $receivedDate,
                'total_amount' => 0, // Sẽ tính và cập nhật sau khi thêm các chi tiết
                'created_at'   => $receivedDate . ' 08:30:00',
                'updated_at'   => $receivedDate . ' 08:30:00',
            ]);

            $itemCount = rand(2, 5);
            $selectedVariants = (array) array_rand($variants, $itemCount);
            $receiptTotal = 0;

            foreach ($selectedVariants as $idx) {
                $variant = $variants[$idx];
                $quantity = rand(10, 50);
                $unitPrice = $variant->average_cost > 0 ? $variant->average_cost : round($variant->selling_price * 0.82);
                $itemTotal = $quantity * $unitPrice;
                $receiptTotal += $itemTotal;

                DB::table('purchase_receipt_items')->insert([
                    'purchase_receipt_id' => $receiptId,
                    'product_variant_id'  => $variant->id,
                    'quantity'            => $quantity,
                    'unit_price'          => $unitPrice,
                    'total_amount'        => $itemTotal,
                    'note'                => $receiptNotes[array_rand($receiptNotes)],
                ]);
            }

            DB::table('purchase_receipts')->where('id', $receiptId)->update([
                'total_amount' => $receiptTotal,
            ]);
        }
    }
}

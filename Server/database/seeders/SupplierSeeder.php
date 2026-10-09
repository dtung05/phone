<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupplierSeeder extends Seeder
{
    /**
     * Tạo danh sách các Nhà cung cấp công nghệ chính hãng
     */
    public function run(): void
    {
        $now = now();

        $suppliers = [
            [
                'company_name' => 'Công ty TNHH Apple Việt Nam',
                'address'      => 'Tầng 32, Tòa nhà Bitexco Financial Tower, Quận 1, TP.HCM',
                'phone_number' => '02838221234',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
            [
                'company_name' => 'Công ty TNHH Điện tử Samsung Vina',
                'address'      => 'Số 2 Hải Triều, Bến Nghé, Quận 1, TP.HCM',
                'phone_number' => '02839157310',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
            [
                'company_name' => 'Công ty Cổ phần Thế Giới Số (Digiworld)',
                'address'      => '195 Cô Bắc, Phường Cô Giang, Quận 1, TP.HCM',
                'phone_number' => '02839201999',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
            [
                'company_name' => 'Công ty Cổ phần Phân phối Synnex FPT',
                'address'      => 'Tòa nhà FPT Cầu Giấy, Phố Duy Tân, Cầu Giấy, Hà Nội',
                'phone_number' => '02473006666',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
            [
                'company_name' => 'Công ty TNHH Xiaomi Việt Nam',
                'address'      => 'Tầng 21, Tòa nhà Vietcombank Tower, Quận 1, TP.HCM',
                'phone_number' => '02838240555',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
            [
                'company_name' => 'Công ty TNHH Thương mại Viettel (Viettel Commerce)',
                'address'      => 'Số 1 Giang Văn Minh, Kim Mã, Ba Đình, Hà Nội',
                'phone_number' => '02462556789',
                'created_at'   => $now,
                'updated_at'   => $now,
            ],
        ];

        foreach ($suppliers as $sup) {
            DB::table('suppliers')->updateOrInsert(['company_name' => $sup['company_name']], $sup);
        }
    }
}

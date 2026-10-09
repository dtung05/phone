<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryBrandSeeder extends Seeder
{
   
    public function run(): void
    {
        $now = now();
        $categories = [
            ['name' => 'Điện thoại thông minh', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Máy tính bảng',         'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Phụ kiện & Âm thanh',   'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Đồng hồ thông minh',    'created_at' => $now, 'updated_at' => $now],
        ];
        foreach ($categories as $cat) {
            DB::table('categories')->updateOrInsert(['name' => $cat['name']], $cat);
        }
        $brands = [
            ['name' => 'Apple',   'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Samsung', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Xiaomi',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'OPPO',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Vivo',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Realme',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'ASUS',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Sony',    'created_at' => $now, 'updated_at' => $now],
        ];
        foreach ($brands as $brand) {
            DB::table('brands')->updateOrInsert(['name' => $brand['name']], $brand);
        }
    }
}

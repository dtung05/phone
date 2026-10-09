<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
   
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        DB::table('review_replies')->truncate();
        DB::table('reviews')->truncate();
        DB::table('order_items')->truncate();
        DB::table('orders')->truncate();
        DB::table('purchase_receipt_items')->truncate();
        DB::table('purchase_receipts')->truncate();
        DB::table('product_variants')->truncate();
        DB::table('products')->truncate();
        DB::table('suppliers')->truncate();
        DB::table('banners')->truncate();
        DB::table('categories')->truncate();
        DB::table('brands')->truncate();
        DB::table('users')->truncate();

        Schema::enableForeignKeyConstraints();

        $this->call([
            UserSeeder::class,           //tạo ngườ dùng
            CategoryBrandSeeder::class,   // tạo tphuongw hiệu
            ProductSeeder::class,         // sản phẩm mẫu
            SupplierSeeder::class,        // nhà cung cấp
            PurchaseReceiptSeeder::class, // phiếu nhaanpj kho
            OrderSeeder::class,           //đơn hàng
            BannerSeeder::class,          // quản cáo cho trang chủ
            ReviewSeeder::class,          // phản hồi từ khách hàng
        ]);
    }
}

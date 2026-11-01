<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{

    public function run(): void
    {
        $disk = Storage::disk('public');

        $disk->makeDirectory('products');
        // link ảnh dùng để chạy dữ liệu thử
        $imageSources = [
            'iphone_16_pm.jpg'     => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01_1.jpg',
            'iphone_16_pro.jpg'    => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb-3_2.jpg',
            'iphone_15_pm.jpg'     => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png',
            'iphone_14.jpg'        => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png',
            'galaxy_s25_ultra.jpg' => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s26-fe-tim-03.jpg',
            'galaxy_s25.jpg'       => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s26-fe-tim-03.jpg',
            'galaxy_z_fold.jpg'    => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a07-black.jpg',
            'xiaomi_15.jpg'        => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-poco-f9-ultra-black.jpg',
            'xiaomi_redmi.jpg'     => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-poco-f9-ultra-red.jpg',
            'oppo_find.jpg'        => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/redmi-note-15-5g.jpg',
            'vivo_x200.jpg'        => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-ultra-den.jpg',
            'ipad_pro.jpg'         => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png',
            'galaxy_tab.jpg'       => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-ultra-den.jpg',
            'apple_watch.jpg'      => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/1222.png',
            'galaxy_watch.jpg'     => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/5/1565203894_1491579.jpg',
            'airpods_pro.jpg'      => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-5-sac-co-day.jpg',
            'sony_headphones.jpg'  => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_430.png',
            'charger_anker.jpg'    => 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_515_1_.png',
        ];
        // tải ảnh và lưu vào forde
        $downloaded = [];
        foreach ($imageSources as $fileName => $url) {
            $path = 'products/' . $fileName;
            if (!$disk->exists($path)) {
                try {
                    $response = Http::timeout(15)->get($url);
                    if ($response->successful()) {
                        $disk->put($path, $response->body());
                    }
                } catch (\Illuminate\Http\Client\ConnectionException $e) {
                    continue;
                }
            }
            if ($disk->exists($path)) {
                $downloaded[] = $path;
            }
        }
        $brands = DB::table('brands')->pluck('id')->toArray();
        $categories = DB::table('categories')->pluck('id')->toArray();
        if (empty($downloaded)) {
            throw new \RuntimeException('Không có ảnh nào được tải thành công.');
        }

        if (empty($brands) || empty($categories)) {
            throw new \RuntimeException('Chưa có dữ liệu thương hiệu hoặc danh mục.');
        }
        Product::factory(300)->state(function () use ($downloaded, $brands, $categories) {
            $images = [];
            $imageCount = fake()->numberBetween(1, 5);
            for ($i =  0; $i < $imageCount; $i++) {
                $images[] = fake()->randomElement($downloaded);
            }
            return [
                'brand_id' => fake()->randomElement($brands),
                'category_id' => fake()->randomElement($categories),
                'thumbnail' => fake()->randomElement($downloaded),
                'images' => $images,
            ];
        })->create();
    }
}

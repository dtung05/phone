<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
   
    public function run(): void
    {
        $now = now();

        $targetDir = storage_path('app/public/products');
        if (!File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }
        // mẫu 20 ảnh
        $imageSources = [
            'iphone_16_pm.jpg'     => 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
            'iphone_16_pro.jpg'    => 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
            'iphone_15_pm.jpg'     => 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
            'iphone_14.jpg'        => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
            'galaxy_s25_ultra.jpg' => 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
            'galaxy_s25.jpg'       => 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
            'galaxy_z_fold.jpg'    => 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
            'xiaomi_15.jpg'        => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
            'xiaomi_redmi.jpg'     => 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
            'oppo_find.jpg'        => 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80',
            'vivo_x200.jpg'        => 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80',
            'ipad_pro.jpg'         => 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
            'galaxy_tab.jpg'       => 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
            'apple_watch.jpg'      => 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
            'galaxy_watch.jpg'     => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
            'airpods_pro.jpg'      => 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80',
            'sony_headphones.jpg'  => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
            'charger_anker.jpg'    => 'https://images.unsplash.com/photo-1622445262464-84b14e0745b3?w=600&q=80',
        ];

        $downloaded = [];
        foreach ($imageSources as $fileName => $url) {
            $dest = $targetDir . DIRECTORY_SEPARATOR . $fileName;
            if (!File::exists($dest)) {
                $content = @file_get_contents($url);
                if ($content) {
                    File::put($dest, $content);
                }
            }
            if (File::exists($dest)) {
                $downloaded[] = 'products/' . $fileName;
            }
        }

        $brands = DB::table('brands')->pluck('id', 'name')->toArray();
        $categories = DB::table('categories')->pluck('id', 'name')->toArray();
        // tạo mẫu 20 sản phẩm
        $sampleProducts = [
            [
                'name' => 'iPhone 16 Pro Max',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/iphone_16_pm.jpg',
                'specs' => [
                    'Màn hình' => 'OLED 6.9 inch Super Retina XDR, 120Hz ProMotion',
                    'Chip xử lý' => 'Apple A18 Pro 3nm cực mạnh',
                    'Camera' => 'Chính 48MP, Siêu rộng 48MP, Tele 12MP zoom quang 5x',
                    'Pin' => '4685 mAh, Sạc nhanh 25W',
                ],
                'variants' => [
                    ['color' => 'Titan Sa Mạc', 'storage' => '256GB', 'price' => 34990000, 'cost' => 30000000, 'stock' => 50],
                    ['color' => 'Titan Tự Nhiên', 'storage' => '512GB', 'price' => 40990000, 'cost' => 35500000, 'stock' => 40],
                ],
            ],
            [
                'name' => 'iPhone 16 Pro',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 8,
                'is_sale' => '1',
                'img' => 'products/iphone_16_pro.jpg',
                'specs' => ['Màn hình' => 'OLED 6.3 inch Super Retina XDR, 120Hz', 'Chip xử lý' => 'Apple A18 Pro'],
                'variants' => [
                    ['color' => 'Titan Trắng', 'storage' => '128GB', 'price' => 28990000, 'cost' => 25000000, 'stock' => 45],
                    ['color' => 'Titan Đen',   'storage' => '256GB', 'price' => 31990000, 'cost' => 27500000, 'stock' => 35],
                ],
            ],
            [
                'name' => 'iPhone 16',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 5,
                'is_sale' => '1',
                'img' => 'products/iphone_14.jpg',
                'specs' => ['Màn hình' => 'OLED 6.1 inch Super Retina XDR', 'Chip xử lý' => 'Apple A18'],
                'variants' => [
                    ['color' => 'Hồng Pastel', 'storage' => '128GB', 'price' => 22490000, 'cost' => 19000000, 'stock' => 60],
                    ['color' => 'Xanh Lưu Ly', 'storage' => '256GB', 'price' => 25490000, 'cost' => 22000000, 'stock' => 50],
                ],
            ],
            [
                'name' => 'iPhone 15 Pro Max',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 15,
                'is_sale' => '1',
                'img' => 'products/iphone_15_pm.jpg',
                'specs' => ['Màn hình' => 'OLED 6.7 inch, 120Hz', 'Chip xử lý' => 'Apple A17 Pro'],
                'variants' => [
                    ['color' => 'Titan Tự Nhiên', 'storage' => '256GB', 'price' => 29490000, 'cost' => 25500000, 'stock' => 50],
                ],
            ],
            [
                'name' => 'iPhone 15',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 12,
                'is_sale' => '1',
                'img' => 'products/iphone_14.jpg',
                'specs' => ['Màn hình' => 'OLED 6.1 inch Dynamic Island', 'Chip xử lý' => 'Apple A16 Bionic'],
                'variants' => [
                    ['color' => 'Xanh Dương', 'storage' => '128GB', 'price' => 19290000, 'cost' => 16500000, 'stock' => 70],
                ],
            ],
            [
                'name' => 'Samsung Galaxy S25 Ultra 5G',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/galaxy_s25_ultra.jpg',
                'specs' => ['Màn hình' => 'Dynamic AMOLED 2X 6.8 inch 120Hz', 'Chip xử lý' => 'Snapdragon 8 Elite'],
                'variants' => [
                    ['color' => 'Titanium Xám', 'storage' => '256GB', 'price' => 33990000, 'cost' => 29500000, 'stock' => 45],
                    ['color' => 'Titanium Đen', 'storage' => '512GB', 'price' => 37990000, 'cost' => 33000000, 'stock' => 30],
                ],
            ],
            [
                'name' => 'Samsung Galaxy S25 Plus',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 12,
                'is_sale' => '1',
                'img' => 'products/galaxy_s25.jpg',
                'specs' => ['Màn hình' => 'Dynamic AMOLED 2X 6.7 inch', 'Chip xử lý' => 'Exynos 2500'],
                'variants' => [
                    ['color' => 'Xanh Navy', 'storage' => '256GB', 'price' => 25990000, 'cost' => 22000000, 'stock' => 50],
                ],
            ],
            [
                'name' => 'Samsung Galaxy Z Fold6 5G',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 15,
                'is_sale' => '1',
                'img' => 'products/galaxy_z_fold.jpg',
                'specs' => ['Màn hình gập' => '7.6 inch Dynamic AMOLED 2X', 'Chip xử lý' => 'Snapdragon 8 Gen 3'],
                'variants' => [
                    ['color' => 'Xám Metal', 'storage' => '256GB', 'price' => 41990000, 'cost' => 36500000, 'stock' => 25],
                ],
            ],
            [
                'name' => 'Samsung Galaxy A55 5G',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 15,
                'is_sale' => '1',
                'img' => 'products/galaxy_s25.jpg',
                'specs' => ['Màn hình' => 'Super AMOLED 6.6 inch, 120Hz', 'Chip xử lý' => 'Exynos 1480'],
                'variants' => [
                    ['color' => 'Xanh Iceblue', 'storage' => '128GB', 'price' => 9690000, 'cost' => 8000000, 'stock' => 80],
                ],
            ],
            [
                'name' => 'Xiaomi 15 Pro',
                'brand_id' => $brands['Xiaomi'] ?? 3,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/xiaomi_15.jpg',
                'specs' => ['Màn hình' => 'AMOLED 6.73 inch 2K, 120Hz', 'Camera' => 'Leica 50MP'],
                'variants' => [
                    ['color' => 'Bạc Titan', 'storage' => '256GB', 'price' => 21990000, 'cost' => 18500000, 'stock' => 40],
                ],
            ],
            [
                'name' => 'Xiaomi Redmi Note 14 Pro Plus 5G',
                'brand_id' => $brands['Xiaomi'] ?? 3,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 12,
                'is_sale' => '1',
                'img' => 'products/xiaomi_redmi.jpg',
                'specs' => ['Màn hình' => 'AMOLED cong 1.5K, 120Hz', 'Camera' => '200MP OIS'],
                'variants' => [
                    ['color' => 'Xanh Biển Ngân Hà', 'storage' => '256GB', 'price' => 8490000, 'cost' => 6900000, 'stock' => 90],
                ],
            ],
            [
                'name' => 'OPPO Find X8 Pro 5G',
                'brand_id' => $brands['OPPO'] ?? 4,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/oppo_find.jpg',
                'specs' => ['Màn hình' => 'AMOLED 6.78 inch', 'Camera' => 'Hasselblad 50MP'],
                'variants' => [
                    ['color' => 'Trắng Ngọc Trai', 'storage' => '512GB', 'price' => 29990000, 'cost' => 25500000, 'stock' => 30],
                ],
            ],
            [
                'name' => 'OPPO Reno 12 Pro 5G',
                'brand_id' => $brands['OPPO'] ?? 4,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 0,
                'is_sale' => '0',
                'img' => 'products/oppo_find.jpg',
                'specs' => ['Màn hình' => 'AMOLED 6.7 inch, 120Hz', 'Chip xử lý' => 'Dimensity 7300'],
                'variants' => [
                    ['color' => 'Bạc Vũ Trụ', 'storage' => '256GB', 'price' => 14990000, 'cost' => 12500000, 'stock' => 50],
                ],
            ],
            [
                'name' => 'Vivo X200 Pro 5G',
                'brand_id' => $brands['Vivo'] ?? 5,
                'category_id' => $categories['Điện thoại thông minh'] ?? 1,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/vivo_x200.jpg',
                'specs' => ['Màn hình' => 'LTPO AMOLED 6.78 inch', 'Camera' => '200MP Tele ZEISS'],
                'variants' => [
                    ['color' => 'Xanh Hải Dương', 'storage' => '256GB', 'price' => 25990000, 'cost' => 22000000, 'stock' => 35],
                ],
            ],
            [
                'name' => 'iPad Pro M4 11 inch',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Máy tính bảng'] ?? 2,
                'discount' => 8,
                'is_sale' => '1',
                'img' => 'products/ipad_pro.jpg',
                'specs' => ['Màn hình' => 'Ultra Retina XDR Tandem OLED', 'Chip xử lý' => 'Apple M4'],
                'variants' => [
                    ['color' => 'Đen Không Gian', 'storage' => '256GB', 'price' => 27990000, 'cost' => 24000000, 'stock' => 40],
                    ['color' => 'Bạc Ánh Kim',   'storage' => '512GB', 'price' => 33490000, 'cost' => 29000000, 'stock' => 30],
                ],
            ],
            [
                'name' => 'Galaxy Tab S9 Ultra',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Máy tính bảng'] ?? 2,
                'discount' => 15,
                'is_sale' => '1',
                'img' => 'products/galaxy_tab.jpg',
                'specs' => ['Màn hình' => 'Dynamic AMOLED 2X 14.6 inch', 'Bút' => 'S Pen đi kèm'],
                'variants' => [
                    ['color' => 'Xám Graphite', 'storage' => '256GB', 'price' => 28990000, 'cost' => 24500000, 'stock' => 30],
                ],
            ],
            [
                'name' => 'Apple Watch Series 10',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Đồng hồ thông minh'] ?? 4,
                'discount' => 10,
                'is_sale' => '1',
                'img' => 'products/apple_watch.jpg',
                'specs' => ['Màn hình' => 'OLED góc nhìn rộng', 'Chống nước' => '50m WR50'],
                'variants' => [
                    ['color' => 'Nhôm Đen Bóng', 'storage' => '42mm GPS', 'price' => 10990000, 'cost' => 9000000, 'stock' => 60],
                    ['color' => 'Nhôm Vàng Hồng', 'storage' => '46mm GPS', 'price' => 11990000, 'cost' => 9800000, 'stock' => 50],
                ],
            ],
            [
                'name' => 'Galaxy Watch 7',
                'brand_id' => $brands['Samsung'] ?? 2,
                'category_id' => $categories['Đồng hồ thông minh'] ?? 4,
                'discount' => 12,
                'is_sale' => '1',
                'img' => 'products/galaxy_watch.jpg',
                'specs' => ['Màn hình' => 'Super AMOLED Sapphire', 'Chip xử lý' => 'Exynos W1000 3nm'],
                'variants' => [
                    ['color' => 'Xanh Quân Đội', 'storage' => '40mm', 'price' => 6990000, 'cost' => 5600000, 'stock' => 70],
                ],
            ],
            [
                'name' => 'Tai nghe AirPods Pro 2 USB-C',
                'brand_id' => $brands['Apple'] ?? 1,
                'category_id' => $categories['Phụ kiện & Âm thanh'] ?? 3,
                'discount' => 15,
                'is_sale' => '1',
                'img' => 'products/airpods_pro.jpg',
                'specs' => ['Chống ồn' => 'Chủ động ANC gấp 2 lần', 'Cổng sạc' => 'USB-C & MagSafe'],
                'variants' => [
                    ['color' => 'Trắng', 'storage' => 'Tiêu chuẩn', 'price' => 5490000, 'cost' => 4500000, 'stock' => 100],
                ],
            ],
            [
                'name' => 'Tai nghe Sony WH-1000XM5',
                'brand_id' => $brands['Sony'] ?? 8,
                'category_id' => $categories['Phụ kiện & Âm thanh'] ?? 3,
                'discount' => 18,
                'is_sale' => '1',
                'img' => 'products/sony_headphones.jpg',
                'specs' => ['Chống ồn' => 'Bộ xử lý V1 + QN1 đỉnh cao', 'Thời lượng pin' => '30 giờ liên tục'],
                'variants' => [
                    ['color' => 'Đen Nhám', 'storage' => 'Tiêu chuẩn', 'price' => 7990000, 'cost' => 6500000, 'stock' => 50],
                    ['color' => 'Bạc Bạch Kim', 'storage' => 'Tiêu chuẩn', 'price' => 7990000, 'cost' => 6500000, 'stock' => 45],
                ],
            ],
        ];

        foreach ($sampleProducts as $sp) {
            $cleanName = str_replace('+', ' Plus', $sp['name']);
            $slug = Str::slug($cleanName);
            $thumb = File::exists(storage_path('app/public/' . $sp['img']))
                ? $sp['img']
                : ($downloaded[0] ?? 'products/sample.jpg');

            $productId = DB::table('products')->insertGetId([
                'brand_id' => $sp['brand_id'],
                'category_id' => $sp['category_id'],
                'product_name' => $sp['name'],
                'slug' => $slug,
                'thumbnail' => $thumb,
                'review_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'discount_perventage' => $sp['discount'],
                'is_sale' => $sp['is_sale'],
                'images' => json_encode([$thumb]),
                'specifications' => json_encode($sp['specs']),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            foreach ($sp['variants'] as $v) {
                DB::table('product_variants')->insert([
                    'product_id' => $productId,
                    'selling_price' => $v['price'],
                    'average_cost' => $v['cost'],
                    'stock_quantity' => $v['stock'],
                    'attributes' => json_encode([
                        'color' => $v['color'],
                        'storage' => $v['storage'],
                    ]),
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        $catalog = [
            ['name' => 'iPad Air M2 11 inch',    'b' => $brands['Apple'] ?? 1,   'c' => $categories['Máy tính bảng'] ?? 2,       'img' => 'products/ipad_pro.jpg'],
            ['name' => 'Xiaomi Pad 6 Pro',        'b' => $brands['Xiaomi'] ?? 3,  'c' => $categories['Máy tính bảng'] ?? 2,       'img' => 'products/galaxy_tab.jpg'],
            ['name' => 'Củ sạc Anker 65W GaN',    'b' => $brands['Xiaomi'] ?? 3,  'c' => $categories['Phụ kiện & Âm thanh'] ?? 3, 'img' => 'products/charger_anker.jpg'],
            ['name' => 'Samsung Galaxy A16',      'b' => $brands['Samsung'] ?? 2, 'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/galaxy_s25.jpg'],
            ['name' => 'Xiaomi Redmi 13C',        'b' => $brands['Xiaomi'] ?? 3,  'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/xiaomi_redmi.jpg'],
            ['name' => 'OPPO A3x 4G',             'b' => $brands['OPPO'] ?? 4,    'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/oppo_find.jpg'],
            ['name' => 'Realme C65',              'b' => $brands['Realme'] ?? 6,  'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/vivo_x200.jpg'],
            ['name' => 'Vivo Y18',                'b' => $brands['Vivo'] ?? 5,    'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/vivo_x200.jpg'],
            ['name' => 'ASUS ROG Phone 8',        'b' => $brands['ASUS'] ?? 7,    'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/xiaomi_15.jpg'],
            ['name' => 'Sony Xperia 1 VI',        'b' => $brands['Sony'] ?? 8,    'c' => $categories['Điện thoại thông minh'] ?? 1, 'img' => 'products/sony_headphones.jpg'],
        ];

        $colors = ['Đen Titan', 'Trắng Bạc', 'Xanh Biển', 'Vàng Sa Mạc', 'Xám Không Gian'];
        $storages = ['128GB', '256GB', '512GB', 'Tiêu chuẩn'];
        $variantsBatch = [];

        for ($i = 1; $i <= 300; $i++) {
            $item = $catalog[$i % count($catalog)];
            $prodName = "{$item['name']} [Bản {$i}]";
            $cleanName = str_replace('+', ' Plus', $item['name']);
            $slug = Str::slug($cleanName) . "-ban-{$i}-" . strtolower(Str::random(4));

            $isSale = ($i % 3 === 0) ? '1' : '0';
            $discount = ($isSale === '1') ? rand(10, 30) : 0;

            $thumb = File::exists(storage_path('app/public/' . $item['img']))
                ? $item['img']
                : ($downloaded[array_rand($downloaded)] ?? 'products/sample.jpg');

            $productId = DB::table('products')->insertGetId([
                'brand_id' => $item['b'],
                'category_id' => $item['c'],
                'product_name' => $prodName,
                'slug' => $slug,
                'thumbnail' => $thumb,
                'review_video' => null,
                'discount_perventage' => $discount,
                'is_sale' => $isSale,
                'images' => json_encode([$thumb]),
                'specifications' => json_encode([
                    'Bảo hành' => '12 tháng chính hãng',
                    'Xuất xứ'  => 'Chính hãng VN/A',
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $variantCount = rand(1, 2);
            for ($v = 1; $v <= $variantCount; $v++) {
                $basePrice = rand(600, 35000) * 1000;
                $cost = intval($basePrice * 0.82);

                $variantsBatch[] = [
                    'product_id' => $productId,
                    'selling_price' => $basePrice,
                    'average_cost' => $cost,
                    'stock_quantity' => rand(20, 100),
                    'attributes' => json_encode([
                        'color' => $colors[array_rand($colors)],
                        'storage' => $storages[array_rand($storages)],
                    ]),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                if (count($variantsBatch) >= 200) {
                    DB::table('product_variants')->insert($variantsBatch);
                    $variantsBatch = [];
                }
            }
        }

        if (!empty($variantsBatch)) {
            DB::table('product_variants')->insert($variantsBatch);
        }
    }
}

<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Str;

/**
 * @extends Factory<product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        $phoneNames = [
            'Apple iPhone 17 Pro Max 256GB Titan Đen Chính Hãng',
            'Apple iPhone 17 Pro 512GB Titan Trắng Chính Hãng',
            'Apple iPhone 16 Pro Max 256GB Titan Sa Mạc',
            'Apple iPhone 16 Pro 512GB Titan Tự Nhiên',
            'Apple iPhone 16 Plus 128GB Xanh Lưu Ly',
            'Samsung Galaxy S25 Ultra 256GB Titanium Black',
            'Samsung Galaxy S25 Plus 512GB Xanh Navy Chính Hãng',
            'Samsung Galaxy S25 256GB Bạc Xanh Chính Hãng',
            'Samsung Galaxy S24 FE 256GB Xám Graphite',
            'Samsung Galaxy A56 5G 256GB Awesome Pink',
            'Xiaomi Redmi Note 14 Pro Plus 5G 512GB',
            'Xiaomi Redmi Note 14 Pro 5G 256GB Xanh',
            'Xiaomi Redmi Note 14 256GB Đen Midnight',
            'Xiaomi Redmi 13C 128GB Xanh Navy Chính Hãng',
            'Xiaomi 15 Ultra 512GB Đen Titan Chính Hãng',
            'OPPO Find X8 Pro 5G 512GB Trắng Ngọc Trai',
            'OPPO Reno 13 Pro 5G 256GB Hồng Ánh Ngọc',
            'OPPO Reno 12 F 5G 256GB Xanh Lá',
            'OPPO A3x 4G 128GB Đen Tinh Thể',
            'Vivo X200 Pro 5G 512GB Xanh Hải Dương',
            'Vivo V50 5G 256GB Hồng Ánh Sao Chính Hãng',
            'Vivo Y18 128GB Đen Kim Cương Chính Hãng',
            'Realme GT 7 Pro 5G 512GB Cam Racing',
            'Realme C65 8GB 256GB Xanh Lá Chính Hãng',
            'Realme 13 Plus 5G 256GB Vàng Speed',
            'Google Pixel 9 Pro XL 256GB Obsidian Black',
            'Google Pixel 9 128GB Wintergreen Chính Hãng',
            'Nokia G42 5G 128GB Xám So Dark Chính Hãng',
            'Motorola Edge 50 Pro 5G 512GB Đen Luxe',
            'ASUS ROG Phone 9 Pro 5G 512GB Phantom Black',
        ];
        $name = fake()->randomElement($phoneNames);
        $slug = fake()->unique()->userName();
        $reviews = [
            'https://www.youtube.com/embed/k9K2DJlU3X8?si=hznIZBB3cHbV5IMY',
            "https://www.youtube.com/embed/0A4wOtCVgKI?si=KuCJHSCRxtVxKnTZ",
            "https://www.youtube.com/embed/5FCGTTfu3Us?si=tFcnIUMiSt1VE4Wv"
        ];

        $phoneSpecifications = [
            [
                'Màn hình: AMOLED 6.9 inch',
                'Độ phân giải: 2868 x 1320 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Apple A18 Pro',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 48MP',
                'Pin: 4685mAh',
                'Sạc nhanh: 25W',
                'Hệ điều hành: iOS',
            ],
            [
                'Màn hình: AMOLED 6.8 inch',
                'Độ phân giải: 3120 x 1440 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Elite',
                'RAM: 12GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 200MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 45W',
                'Hệ điều hành: Android',
            ],
            [
                'Màn hình: AMOLED 6.7 inch',
                'Độ phân giải: 2712 x 1220 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Gen 3',
                'RAM: 12GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 5400mAh',
                'Sạc nhanh: 100W',
            ],
            [
                'Màn hình: AMOLED 6.67 inch',
                'Độ phân giải: 2712 x 1220 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 7s Gen 3',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 200MP',
                'Pin: 5110mAh',
                'Sạc nhanh: 120W',
                'Hệ điều hành: Android',
            ],
            [
                'Màn hình: AMOLED 6.36 inch',
                'Độ phân giải: 2670 x 1200 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Elite',
                'RAM: 12GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5240mAh',
                'Sạc nhanh: 90W',
            ],
            [
                'Màn hình: AMOLED 6.7 inch',
                'Độ phân giải: 2412 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: MediaTek Dimensity 8350',
                'RAM: 12GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5800mAh',
                'Sạc nhanh: 80W',
            ],
            [
                'Màn hình: AMOLED 6.78 inch',
                'Độ phân giải: 2800 x 1260 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: MediaTek Dimensity 9300',
                'RAM: 12GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 6000mAh',
                'Sạc nhanh: 90W',
            ],
            [
                'Màn hình: LCD 6.74 inch',
                'Độ phân giải: 1600 x 720 pixels',
                'Tần số quét: 90Hz',
                'Chip xử lý: MediaTek Helio G85',
                'RAM: 4GB',
                'Bộ nhớ trong: 128GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 18W',
            ],
            [
                'Màn hình: AMOLED 6.7 inch',
                'Độ phân giải: 2340 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Exynos 1580',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 45W',
            ],
            [
                'Màn hình: AMOLED 6.6 inch',
                'Độ phân giải: 2400 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 7 Gen 3',
                'RAM: 12GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 80W',
            ],
            [
                'Màn hình: OLED 6.3 inch',
                'Độ phân giải: 2424 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Google Tensor G4',
                'RAM: 12GB',
                'Bộ nhớ trong: 128GB',
                'Camera chính: 50MP',
                'Pin: 4700mAh',
                'Sạc nhanh: 27W',
            ],
            [
                'Màn hình: AMOLED 6.78 inch',
                'Độ phân giải: 2800 x 1260 pixels',
                'Tần số quét: 144Hz',
                'Chip xử lý: Snapdragon 8 Gen 3',
                'RAM: 16GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 5500mAh',
                'Sạc nhanh: 65W',
            ],
            [
                'Màn hình: AMOLED 6.67 inch',
                'Độ phân giải: 2400 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: MediaTek Dimensity 7300',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 45W',
            ],
            [
                'Màn hình: LCD 6.56 inch',
                'Độ phân giải: 1612 x 720 pixels',
                'Tần số quét: 90Hz',
                'Chip xử lý: MediaTek Helio G85',
                'RAM: 6GB',
                'Bộ nhớ trong: 128GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
            ],
            [
                'Màn hình: AMOLED 6.74 inch',
                'Độ phân giải: 2772 x 1240 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: MediaTek Dimensity 8300',
                'RAM: 12GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 5500mAh',
                'Sạc nhanh: 100W',
            ],
            [
                'Màn hình: AMOLED 6.78 inch',
                'Độ phân giải: 2780 x 1264 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Gen 3',
                'RAM: 16GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 5500mAh',
                'Sạc nhanh: 100W',
            ],
            [
                'Màn hình: AMOLED 6.7 inch',
                'Độ phân giải: 2412 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: MediaTek Dimensity 7050',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 64MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 67W',
            ],
            [
                'Màn hình: AMOLED 6.78 inch',
                'Độ phân giải: 2800 x 1260 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Elite',
                'RAM: 16GB',
                'Bộ nhớ trong: 512GB',
                'Camera chính: 50MP',
                'Pin: 5800mAh',
                'Sạc nhanh: 120W',
                'Hệ điều hành: Android',
            ],
            [
                'Màn hình: AMOLED 6.5 inch',
                'Độ phân giải: 2340 x 1080 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Exynos 1380',
                'RAM: 8GB',
                'Bộ nhớ trong: 256GB',
                'Camera chính: 50MP',
                'Pin: 5000mAh',
                'Sạc nhanh: 25W',
            ],
            [
                'Màn hình: AMOLED 6.82 inch',
                'Độ phân giải: 3168 x 1440 pixels',
                'Tần số quét: 120Hz',
                'Chip xử lý: Snapdragon 8 Elite',
                'RAM: 16GB',
                'Bộ nhớ trong: 1TB',
                'Camera chính: 50MP',
                'Pin: 6000mAh',
                'Sạc nhanh: 65W',
                'Hệ điều hành: Android',
            ],
        ];
        $now = now();
        $isSale = fake()->randomElement([0, 1]);
        return [
            'product_name' => $name,
            'slug' => $slug,
            'review_video' => fake()->randomElement($reviews),
            'is_sale' => $isSale,
            'discount_perventage' => $isSale ? fake()->numberBetween(10, 40) : 0,
            'specifications' => fake()->randomElement($phoneSpecifications),
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }
    public function configure(): static
    {
        return $this->afterCreating(function (Product $product) {
            $colors = [
                'Đen Titan',
                'Trắng Bạc',
                'Xanh Biển',
                'Vàng Sa Mạc',
                'Xám Không Gian',
            ];
            $storages = ['128GB', '256GB', '512GB', 'Tiêu chuẩn'];
            $variants = [];
            $variantCount = fake()->numberBetween(3, 5);
            for ($i = 0; $i < $variantCount; $i++) {
                $price = fake()->numberBetween(600, 35000) * 1000;
                $variants[] = [
                    'product_id' => $product->id,
                    'selling_price' => $price,
                    'average_cost' => (int) ($price * 0.82),
                    'stock_quantity' => fake()->numberBetween(20, 100),
                    'attributes' => json_encode([
                        'color' => fake()->randomElement($colors),
                        'storage' => fake()->randomElement($storages),
                    ]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('product_variants')->insert($variants);
        });
    }
}

<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BannerSeeder extends Seeder
{

    public function run(): void
    {
        // lấy ra ngày tháng tạo banner
        $today = Carbon::today();
        $startDate = $today->copy()->subDays(15)->format('Y-m-d');
        $endDate = $today->copy()->addDays(90)->format('Y-m-d');
        $product = DB::table('products')->first();
        $productSlug = $product ? $product->slug : 'iphone-16-pro-max';

        // xác định đường dẫn
        $bannerDir = storage_path('app/public/banners');
        if (!File::exists($bannerDir)) {
            File::makeDirectory($bannerDir, 0755, true);
        }
// lấy link trên mag
        $bannerImages = [
            'banner_hero_1.jpg' => 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80',
            'banner_hero_2.jpg' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
        ];
// tải ảnh về nếu tồn tại
        foreach ($bannerImages as $name => $url) {
            $dest = $bannerDir . DIRECTORY_SEPARATOR . $name;
            if (!File::exists($dest)) {
                $content = @file_get_contents($url);
                if ($content) {
                    File::put($dest, $content);
                }
            }
        }
// tạo dữ liệu
        $banners = [
            [
                'title'      => 'Siêu Phẩm iPhone 16 Series - Đỉnh Cao Công Nghệ',
                'imager'     => 'banners/banner_hero_1.jpg',
                'link'       => '/products/' . $productSlug,
                'position'   => 'main',
                'is_active'  => '1',
                'start_date' => $startDate,
                'end_date'   => $endDate,
            ],
            [
                'title'      => 'Galaxy S25 Ultra 5G - Quyền Năng AI Đỉnh Cao',
                'imager'     => 'banners/banner_hero_2.jpg',
                'link'       => '/products',
                'position'   => 'main',
                'is_active'  => '1',
                'start_date' => $startDate,
                'end_date'   => $endDate,
            ],
            [
                'title'      => 'Tuần Lễ Sale Phụ Kiện Chính Hãng Giảm Đến 30%',
                'imager'     => 'banners/banner_hero_1.jpg',
                'link'       => '/products/sale',
                'position'   => 'left',
                'is_active'  => '1',
                'start_date' => $startDate,
                'end_date'   => $endDate,
            ],
        ];

        foreach ($banners as $b) {
            DB::table('banners')->updateOrInsert(['title' => $b['title']], $b);
        }
    }
}

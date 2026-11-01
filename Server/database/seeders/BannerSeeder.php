<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BannerSeeder extends Seeder
{
    // position
    public function run(): void
    {

        $product = DB::table('products')->first();
        $productSlug = $product ? $product->slug : 'iphone-16-pro-max';

        // xác định đường dẫn
        $bannerDir = storage_path('app/public/banners');
        if (!File::exists($bannerDir)) {
            File::makeDirectory($bannerDir, 0755, true);
        }
        // lấy link trên mag
        $bannerImages = [
            'banner_hero_1.jpg' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflSE8BNamWsUVR6NZ9gYhWHAFAfYoOehFokdRBPmL4Q&s=10',
            'banner_hero_2.jpg' => 'https://genk.mediacdn.vn/Images/Uploaded/Share/2011/02/28/23iPhoneMagicofCOLORS.jpg',
            'banner_hero_3.jpg' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5VNb2r7RFftZaBuuKvSdZAoVgIOZFu5qpThGKm9smUw&s=10'
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
        Banner::factory(5)->state(function () use ($bannerImages, $productSlug) {
            return [
                'imager' => fake()->randomElement($bannerImages),
                'link' => 'products/' . $productSlug,
            ];
        })->create();
    }
}

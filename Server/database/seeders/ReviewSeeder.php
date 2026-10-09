<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    /**
     * Tạo đánh giá và phản hồi mẫu cho các sản phẩm
     */
    public function run(): void
    {
        $customerIds = DB::table('users')->where('role', 'Khách hàng')->pluck('id')->toArray();
        $staffIds = DB::table('users')->whereIn('role', ['Nhân viên sale', 'Quản trị viên'])->pluck('id')->toArray();
        $productIds = DB::table('products')->take(20)->pluck('id')->toArray();

        if (empty($customerIds) || empty($productIds)) {
            return;
        }

        $comments = [
            'Máy dùng rất mượt mà, màn hình 120Hz siêu đẹp, giao hàng nhanh trong ngày!',
            'Hàng chính hãng nguyên seal, check bảo hành đầy đủ. Rất hài lòng với dịch vụ.',
            'Pin trâu, chụp ảnh ban đêm cực kỳ nét. Giá tốt hơn các bên khác nhiều.',
            'Thiết kế cầm rất đầm tay và sang trọng. Shop tư vấn rất nhiệt tình.',
            'Máy nguyên hộp phụ kiện đầy đủ, đóng gói chống sốc rất cẩn thận 10/10.',
            'Sản phẩm tuyệt vời trong tầm giá, dùng chơi game liên tục không bị nóng máy.',
        ];

        $staffReplies = [
            'Dạ cảm ơn bạn đã tin tưởng mua sắm tại cửa hàng ạ! Nếu cần hỗ trợ thêm thông tin gì bạn cứ nhắn shop nhé.',
            'Shop xin cảm ơn đánh giá tuyệt vời của bạn! Chúc bạn có trải nghiệm thật ưng ý cùng sản phẩm.',
            'Dạ shop cảm ơn bạn nhiều ạ! Chúc bạn một ngày làm việc thật vui vẻ và may mắn!',
        ];

        foreach ($productIds as $pId) {
            // Mỗi sản phẩm có 2 đến 3 đánh giá
            $reviewCount = rand(2, 3);
            for ($k = 1; $k <= $reviewCount; $k++) {
                $customerId = $customerIds[array_rand($customerIds)];
                $hasReply = (rand(1, 10) <= 6); // 60% có phản hồi từ nhân viên
                $reviewDate = Carbon::now()->subDays(rand(1, 20));

                $reviewId = DB::table('reviews')->insertGetId([
                    'user_id'    => $customerId,
                    'product_id' => $pId,
                    'rating'     => rand(4, 5),
                    'content'    => $comments[array_rand($comments)],
                    'is_replied' => $hasReply,
                    'created_at' => $reviewDate,
                    'updated_at' => $reviewDate,
                ]);

                if ($hasReply && !empty($staffIds)) {
                    $staffId = $staffIds[array_rand($staffIds)];
                    DB::table('review_replies')->insert([
                        'review_id'  => $reviewId,
                        'user_id'    => $staffId,
                        'content'    => $staffReplies[array_rand($staffReplies)],
                        'created_at' => $reviewDate->copy()->addHours(rand(1, 12)),
                        'updated_at' => $reviewDate->copy()->addHours(rand(1, 12)),
                    ]);
                }
            }
        }
    }
}

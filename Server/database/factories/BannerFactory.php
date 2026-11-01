<?php

namespace Database\Factories;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends Factory<Banner>
 */
class BannerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $today = Carbon::today();
        $startDate = $today->copy()->subDays(15)->format('Y-m-d');
        $endDate = $today->copy()->addDays(90)->format('Y-m-d');
        $titles = [
            'Siêu Phẩm iPhone 16 Series - Đỉnh Cao Công Nghệ',
            'Galaxy S25 Ultra 5G - Quyền Năng AI Đỉnh Cao',
            'Tuần Lễ Sale Phụ Kiện Chính Hãng Giảm Đến 30%',
        ];
        return [
            'title' => fake()->randomElement($titles),
            'is_active' => '1',
            'start_date' => $startDate,
            'end_date'   => $endDate,
        ];
    }
}

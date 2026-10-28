<?php

namespace Database\Seeders;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{

    public function run(): void
    {
        // lấy thông tin kahchs hàng
        $customerIds = DB::table('users')->where('role', 'Khách hàng')->pluck('id')->toArray();
        if (empty($customerIds)) { // nếu kh có
            $customerIds = DB::table('users')->pluck('id')->toArray();
        }
        Order::factory(100)->state(function ()  use ($customerIds) {
            $userId = fake()->randomElement($customerIds);
            return [
                'user_id'           => $userId,
                'recipient_name'    => 'Khách hàng #' . $userId,
            ];
        })->create();
    }
}

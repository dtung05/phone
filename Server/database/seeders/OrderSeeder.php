<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
 
    public function run(): void
    {
        $customerIds = DB::table('users')->where('role', 'Khách hàng')->pluck('id')->toArray();
        if (empty($customerIds)) {
            $customerIds = DB::table('users')->pluck('id')->toArray();
        }

        $variants = DB::table('product_variants')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->select(
                'product_variants.id as variant_id',
                'product_variants.selling_price',
                'product_variants.attributes',
                'products.product_name',
                'products.thumbnail'
            )
            ->get()
            ->toArray();

        if (empty($variants) || empty($customerIds)) {
            return;
        }

        $orderStatuses = ['Thành công', 'Thành công', 'Thành công', 'Đang giao', 'Đã xác nhận', 'Chờ xử lý', 'Đã hủy'];
        $paymentMethods = ['cod', 'vnpay', 'momo'];
        $cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Bình Dương'];

        for ($i = 1; $i <= 60; $i++) {
            $orderDate = Carbon::now()->subDays(rand(0, 30))->subHours(rand(1, 23))->subMinutes(rand(1, 59));
            $userId = $customerIds[array_rand($customerIds)];
            $status = $orderStatuses[array_rand($orderStatuses)];
            $paymentMethod = $paymentMethods[array_rand($paymentMethods)];
            $paymentStatus = in_array($status, ['Thành công', 'Đang giao']) ? 'Paid' : ($paymentMethod === 'cod' ? 'Unpaid' : 'Paid');
            $city = $cities[array_rand($cities)];

            $orderId = DB::table('orders')->insertGetId([
                'user_id'           => $userId,
                'order_status'      => $status,
                'payment_status'    => $paymentStatus,
                'payment_method'    => $paymentMethod,
                'recipient_name'    => 'Khách hàng #' . $userId,
                'recipient_address' => rand(10, 300) . ' Đường Nguyễn Trãi, Quận 1, ' . $city,
                'recipient_phone'   => '09' . rand(10000000, 99999999),
                'total_amount'      => 0, // Cập nhật sau
                'created_at'        => $orderDate,
                'updated_at'        => $orderDate,
            ]);

            $itemCount = rand(1, 3);
            $selectedVariants = (array) array_rand($variants, $itemCount);
            $orderTotal = 0;

            foreach ($selectedVariants as $vIdx) {
                $item = $variants[$vIdx];
                $quantity = rand(1, 2);
                $unitPrice = $item->selling_price;
                $itemTotal = $quantity * $unitPrice;
                $orderTotal += $itemTotal;

                DB::table('order_items')->insert([
                    'order_id'           => $orderId,
                    'product_variant_id' => $item->variant_id,
                    'product_name'       => $item->product_name,
                    'product_thumbnail'  => $item->thumbnail,
                    'unit_price'         => $unitPrice,
                    'variant_attributes' => $item->attributes,
                    'quantity'           => $quantity,
                    'total_amount'       => $itemTotal,
                ]);
            }

            DB::table('orders')->where('id', $orderId)->update([
                'total_amount' => $orderTotal,
            ]);
        }
    }
}

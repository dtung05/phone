<?php

namespace Database\Factories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        $orderDate = Carbon::now()->subDays(rand(0, 30))->subHours(rand(1, 23))->subMinutes(rand(1, 59));
        $orderStatuses = ['Thành công', 'Đang giao', 'Đã xác nhận', 'Chờ xử lý', 'Đã hủy'];
        $paymentMethods = ['cod', 'vnpay', 'momo'];
        $payment = fake()->randomElement($paymentMethods);
        $status = fake()->randomElement($orderStatuses);
        if (($payment == 'cod' && $status == "Thành công") || ($payment != 'cod' && $status != "Đã hủy")) {
            $statusPayment = 'Paid';
        } else {
            $statusPayment =  "Unpaid";
        }
        $cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Bình Dương'];

        return [
            'order_status' => $status,
            'payment_method' => $payment,
            'payment_status' => $statusPayment,
            'recipient_address' => fake()->numberBetween(1, 99) . "Vĩnh Bảo" . fake()->randomElement($cities),
            'recipient_phone' => fake()->numerify('08########'),
            'total_amount'      => 0, // tính lại giá sau
            'created_at'        => $orderDate,
            'updated_at'        => $orderDate,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Order $order) {
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

            if (empty($variants)) {
                return;
            }

            $itemCount = rand(1, min(3, count($variants)));
            $selectedVariants = (array) array_rand($variants, $itemCount);
            $orderTotal = 0;

            foreach ($selectedVariants as $vIdx) {
                $item = $variants[$vIdx];
                $quantity = rand(1, 2);
                $unitPrice = $item->selling_price;
                $itemTotal = $quantity * $unitPrice;
                $orderTotal += $itemTotal;

                DB::table('order_items')->insert([
                    'order_id'           => $order->id,
                    'product_variant_id' => $item->variant_id,
                    'product_name'       => $item->product_name,
                    'product_thumbnail'  => $item->thumbnail,
                    'unit_price'         => $unitPrice,
                    'variant_attributes' => $item->attributes,
                    'quantity'           => $quantity,
                    'total_amount'       => $itemTotal,
                ]);
            }

            DB::table('orders')->where('id', $order->id)->update([
                'total_amount' => $orderTotal,
            ]);
        });
    }
}

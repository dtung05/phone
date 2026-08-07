<?php

namespace app\Repositories\Order;

use App\Models\Order;
use App\Repositories\Order\OrderRepositoryInterface;

use App\Repositories\BaseRepository;
use Illuminate\Container\Attributes\Auth;

class OrderRepo extends BaseRepository implements OrderRepositoryInterface
{
    public function getModel()
    {
        return Order::class;
    }
    public function createOrder($data, $id, $total_amount, $products)
    {
        $order = $this->model->create([
            'user_id' => $id,
            'payment_method' => $data['payment_method'],
            'recipient_name' => $data['recipient_name'],
            'recipient_phone' => $data['recipient_phone'],
            'recipient_address' => $data['recipient_address'],
            'total_amount' => $total_amount,
        ]);
        foreach ($products as $product) {
            $order->orderItems()->create([
                'product_variant_id' => $product['id'],
                'product_name' => $product['product']['product_name'],
                'product_thumbnail' => $product['product']['thumbnail'],
                'variant_attributes' => $product['attributes'],
                'quantity' => $product['quantity'],
                'unit_price' => $product['selling_price'],
                'total_amount' => $product['total_amount'],
            ]);
        }
        return $order->load('orderItems');
    }
    public function getMyOrders($idUser, $quantity)
    {
        return  $this->model->with('orderItems')
            ->where('user_id', $idUser)->latest()
            ->paginate($quantity);
    }
}

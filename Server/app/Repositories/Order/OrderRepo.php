<?php

namespace app\Repositories\Order;

use App\Models\Order;
use App\Repositories\Order\OrderRepositoryInterface;

use App\Repositories\BaseRepository;

class OrderRepo extends BaseRepository implements OrderRepositoryInterface
{
    public function getModel()
    {
        return Order::class;
    }
}

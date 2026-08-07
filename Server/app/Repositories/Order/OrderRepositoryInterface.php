<?php

namespace app\Repositories\Order;

use App\Repositories\RepositoryInterface;

interface OrderRepositoryInterface extends RepositoryInterface
{
    public function createOrder($data, $id, $total_amount, $products);
    
}

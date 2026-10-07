<?php

namespace App\Repositories\Order;

use App\Repositories\RepositoryInterface;

interface OrderRepositoryInterface extends RepositoryInterface
{
    public function createOrder($data, $id, $total_amount, $products);
    public function getMyOrders($idUser, $quantity, $status);
    public function cancelOrder($id);
    public function findOrderWithItems($id);
    public function getStaffOrders($filters = [], $perPage = 10);
    public function getKpiSummary($startDate, $endDate);
    public function getPaymentMethodStats($startDate, $endDate);
    public function getTopSellingProducts($startDate, $endDate, $limit = 5);
    public function getRevenueByCategory($startDate, $endDate);
    public function getRevenueByBrand($startDate, $endDate);
}

<?php

namespace App\Services;

use App\Repositories\Order\OrderRepositoryInterface;

class DashboardService
{
    protected $orderRepo;

    public function __construct(OrderRepositoryInterface $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    // Lấy báo cáo tổng hợp dashboard
    public function index($startDate, $endDate)
    {
        return [
            'kpi'             => $this->orderRepo->getKpiSummary($startDate, $endDate),
            'categories'      => $this->orderRepo->getRevenueByCategory($startDate, $endDate),
            'brands'          => $this->orderRepo->getRevenueByBrand($startDate, $endDate),
            'top_products'    => $this->orderRepo->getTopSellingProducts($startDate, $endDate, 5),
            'payment_methods' => $this->orderRepo->getPaymentMethodStats($startDate, $endDate),
        ];
    }
}

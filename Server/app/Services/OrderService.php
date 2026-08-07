<?php

namespace app\Services;

use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\ProductVariant\ProductVariantRepoInter;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected $productVariantRepo;
    protected $orderRepo;
    public function __construct(ProductVariantRepoInter $productVariantRepo, OrderRepositoryInterface $orderRepo)
    {
        $this->productVariantRepo  = $productVariantRepo;
        $this->orderRepo = $orderRepo;
    }

    public function hasEnoughStock($ids, $productVariant)
    {
        $quantityRepo = $this->productVariantRepo->getQuantitys($ids);

        foreach ($productVariant as $item) {
            $id = $item['id'];
            if ($item['quantity'] > $quantityRepo[$id]) {
                return true;
            }
        }
        return false;
    }
    public function checkout($productVariant)
    {

        $ids = array_column($productVariant, 'id');
        if ($this->hasEnoughStock($ids, $productVariant)) {
            return false;
        };
        $quantityMap = array_column($productVariant, 'quantity', 'id');
        $product = $this->productVariantRepo->getProductVariants($ids);
        foreach ($product as &$item) {
            $id = $item['id'];
            $item['quantity'] = $quantityMap[$id];
        }
        unset($item);
        return $product;
    }
    public function createOrder($data, $idUser)
    {

        $ids = array_column($data['idQuantities'], 'id');
        //KIểm tra số lượng
        if ($this->hasEnoughStock($ids, $data['idQuantities'])) {
            return false;
        }
        $quantityMap = array_column($data['idQuantities'], 'quantity', 'id');

        $productInfomation = DB::transaction(function () use ($data, $ids, $quantityMap, $idUser) {
            //Trừ số lượng trong kho
            // $this->productVariantRepo->decreaseStock($data['idQuantities']);

            // Lấy ra thông tin sản phẩm
            $productInfomation = $this->productVariantRepo->getProductVariants($ids);
            $total_amount = 0;
            foreach ($productInfomation as &$item) {
                $id = $item['id'];
                $item['quantity'] = $quantityMap[$id];
                $item['total_amount'] = $item['quantity'] * $item['selling_price'];
                $total_amount +=  $item['total_amount'];
            }
            unset($item);
            // Tạo đơn hàng
           
            $order = $this->orderRepo->createOrder($data, $idUser, $total_amount, $productInfomation);
           
            return $order;
        });
        return $productInfomation;
    }
}

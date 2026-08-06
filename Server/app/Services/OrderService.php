<?php

namespace app\Services;

use App\Repositories\ProductVariant\ProductVariantRepoInter;

class OrderService
{
    protected $productVariantRepo;

    public function __construct(ProductVariantRepoInter $productVariantRepo)
    {
        $this->productVariantRepo  = $productVariantRepo;
    }

    public function checkQuantity($ids, $productVariant)
    {
        $quantityRepo = $this->productVariantRepo->getQuantitys($ids);
        foreach ($productVariant as $item) {
            $id = $item['id'];
            if ($item['quantity'] > $quantityRepo[$id]) {
                return false;
            }
        }
        return true;
    }
    public function checkout($productVariant)
    {

        $ids = array_column($productVariant, 'id');
        if (!$this->checkQuantity($ids, $productVariant)) {
            return [
                'type' => "error",
                'message' => "Số lượng không hợp lệ"
            ];
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
}

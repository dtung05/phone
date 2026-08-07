<?php

namespace App\Repositories\ProductVariant;

use App\Repositories\RepositoryInterface;

interface ProductVariantRepoInter extends RepositoryInterface
{
    public function getQuantitys($id);
    public function getProductVariants($ids);

    public function decreaseStock($productVariant);
}

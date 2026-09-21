<?php

namespace App\Repositories\Product;

use App\Repositories\RepositoryInterface;

interface ProductRepositoryInterface extends RepositoryInterface
{
    public function getProduct(String $slug);
    public function productSearch($name);
    public function getProductsByBrand($id);
    public function getProductSale($perPage = null, $filters = []);
    public function getProductNew();
    public function getStaffProducts($search = null, $categoryId = null, $brandId = null, $isSale = null, $perPage = 10);
    public function toggleSale($id);
}

<?php

namespace App\Repositories\Cart;

use App\Repositories\RepositoryInterface;

interface CartRepoInter extends RepositoryInterface
{
    public function addCart($idUser, $product, $stockQuantity);

    public function getMyCart($idUser);
    function deleteCartItem($idUser, $id);
    public function updateCartItem($idUser,$id, $quantity);
}

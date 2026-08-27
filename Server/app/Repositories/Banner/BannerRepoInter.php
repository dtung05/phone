<?php
namespace App\Repositories\Banner;
use App\Repositories\RepositoryInterface;

interface BannerRepoInter extends RepositoryInterface {
    public function getActionBanner();
}
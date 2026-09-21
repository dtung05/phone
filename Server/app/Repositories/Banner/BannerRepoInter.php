<?php

namespace App\Repositories\Banner;

use App\Repositories\RepositoryInterface;

interface BannerRepoInter extends RepositoryInterface
{
    public function getActionBanner();
    public function getStaffBanners(array $filters = [], int $perPage = 10);
    public function toggleActive($id);
}
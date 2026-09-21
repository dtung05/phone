<?php

namespace App\Repositories\Banner;

use App\Models\Banner;
use App\Repositories\BaseRepository;

class BannerRepo extends BaseRepository implements BannerRepoInter
{
    public function getModel()
    {
        return Banner::class;
    }

    public function getActionBanner()
    {
        $today = now()->toDateString();
        return $this->model->where('is_active', '1')
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->select('id', 'title', 'imager', 'link', 'position', 'is_active', 'start_date', 'end_date')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function getStaffBanners(array $filters = [], int $perPage = 10)
    {
        $query = $this->model->newQuery();

        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . trim($filters['search']) . '%');
        }

        if (!empty($filters['position'])) {
            $query->where('position', $filters['position']);
        }

        if (isset($filters['is_active']) && $filters['is_active'] !== '') {
            $query->where('is_active', (string) $filters['is_active']);
        }

        return $query->orderBy('id', 'desc')->paginate($perPage);
    }

    public function toggleActive($id)
    {
        $banner = $this->find($id);
        if (!$banner) {
            return false;
        }
        $banner->is_active = (string) $banner->is_active === '1' ? '0' : '1';
        $banner->save();
        return $banner;
    }
}

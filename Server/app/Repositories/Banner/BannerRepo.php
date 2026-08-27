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
        return $this->model->where('is_active', 1)
            ->where('start_date', "<=", now())
            ->where('end_date', '>=', now())
            ->select('id','title','imager','link','position','is_active')->get();
    }
}

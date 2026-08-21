<?php

namespace  App\Repositories\Brand;

use App\Models\Brand;
use App\Repositories\BaseRepository;
use App\Repositories\Brand\BrandRepoInter;

class BrandRepo extends BaseRepository implements BrandRepoInter
{

    public function getModel()
    {
        return Brand::class;
    }
    
}

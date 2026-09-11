<?php

namespace App\Repositories\Category;

use App\Models\Categorie;
use App\Repositories\BaseRepository;
use App\Repositories\Category\CategoryRepoInter;

class CategoryRepo extends BaseRepository implements CategoryRepoInter
{
    public function getModel()
    {
        return Categorie::class;
    }
}

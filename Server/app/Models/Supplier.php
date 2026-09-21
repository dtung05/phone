<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_name',
        'address',
        'phone_number',
    ];

    public function purchaseReceipts()
    {
        return $this->hasMany(PurchaseReceipt::class);
    }
}

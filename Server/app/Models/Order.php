<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\OrderItem;
use App\Models\User;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'order_status',
        'payment_status',
        'payment_method',
        'recipient_name',
        'recipient_phone',
        'recipient_address',
        'total_amount',
    ];
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

   // lấy ra danh sách tài khoản
    public function getStaffUsers(array $filters = [], int $perPage = 10)
    {
        $query = $this->model->withCount('orders');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderByDesc('id')->paginate($perPage);
    }

    // chi tiết tài khoản dành cho chủ cửa hàng
    public function getStaffUserDetail(int $id)
    {
        return $this->model->with([
            'shippingAddress',
            'orders' => function ($q) {
                $q->orderByDesc('id')->limit(5);
            }
        ])->withCount('orders')->find($id);
    }

    // Chi tiết trang cá nhân dành cho User
    public function getUserProfile(int $id)
    {
        $user = $this->find($id);
        if (!$user) {
            return null;
        }
        $address = $user->shippingAddress;
        $orderCount = $user->orders()->count();
        return [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'phone_number' => $address ? $address->phone_number : '',
            'address' => $address ? $address->address : '',
            'order_count' => $orderCount,
            'created_at' => $user->created_at ? $user->created_at->format('d/m/Y') : null,
        ];
    }
    // trang update tài khoản cá nhân
    public function updateUserProfile(int $id, array $data)
    {
        $user = $this->find($id);
        if (!$user) {
            return null;
        }
        if (!empty($data['full_name'])) {
            $user->full_name = $data['full_name'];
            $user->save();
        }
        if (array_key_exists('phone_number', $data) || array_key_exists('address', $data)) {
            $user->shippingAddress()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'phone_number' => $data['phone_number'] ?? '',
                    'address' => $data['address'] ?? '',
                ]
            );
        }
        return $user;
    }
}

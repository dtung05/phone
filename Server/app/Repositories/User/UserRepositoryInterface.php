<?php

namespace App\Repositories\User;

use App\Repositories\RepositoryInterface;

interface UserRepositoryInterface extends RepositoryInterface
{
    // lấy ra danh sách người dùng 
    public function getStaffUsers(array $filters = [], int $perPage = 10);
    // lấy chi tiết thông tin
    public function getStaffUserDetail(int $id);

    // lấy thông tin cho người dùng
    public function getUserProfile(int $id);
    // người dùng tự cập nhật thông tin cá nhân
    public function updateUserProfile(int $id, array $data);
}

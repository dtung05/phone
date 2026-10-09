<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Seed 1000 tài khoản người dùng với mật khẩu chung là ductung05
     */
    public function run(): void
    {
        $now = now();
        $hashedPassword = Hash::make('ductung05');
        $roles = ['Khách hàng', 'Nhân viên sale', 'Nhân viên kho', 'Quản trị viên'];

        // 1. Tạo 4 tài khoản mẫu cố định đại diện cho từng vai trò để test nhanh
        $fixedUsers = [
            [
                'full_name'  => 'Quản Trị Viên (Admin)',
                'email'      => 'admin@gmail.com',
                'password'   => $hashedPassword,
                'role'       => 'Quản trị viên',
                'status'     => 'Active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'full_name'  => 'Nhân Viên Kho',
                'email'      => 'kho@gmail.com',
                'password'   => $hashedPassword,
                'role'       => 'Nhân viên kho',
                'status'     => 'Active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'full_name'  => 'Nhân Viên Bán Hàng',
                'email'      => 'sale@gmail.com',
                'password'   => $hashedPassword,
                'role'       => 'Nhân viên sale',
                'status'     => 'Active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'full_name'  => 'Khách Hàng Mẫu',
                'email'      => 'khach@gmail.com',
                'password'   => $hashedPassword,
                'role'       => 'Khách hàng',
                'status'     => 'Active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('users')->insert($fixedUsers);

        // 2. Tạo thêm 1000 tài khoản ngẫu nhiên vai trò
        $batch = [];
        for ($i = 1; $i <= 1000; $i++) {
            $rand = strtolower(Str::random(5));
            $batch[] = [
                'full_name'  => 'User ' . strtoupper(Str::random(5)),
                'email'      => "user_{$i}_{$rand}@example.com",
                'password'   => $hashedPassword,
                'role'       => $roles[array_rand($roles)],
                'status'     => 'Active',
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if (count($batch) === 200) {
                DB::table('users')->insert($batch);
                $batch = [];
            }
        }

        if (!empty($batch)) {
            DB::table('users')->insert($batch);
        }
    }
}

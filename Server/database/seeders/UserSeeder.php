<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $hashedPassword = Hash::make('ductung05');

        $fixedUsers = [
            [
                'full_name'  => 'Quản Trị Viên',
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
        User::factory(1000)->state(
            [
                'created_at' => $now,
                'updated_at' => $now,
                'password'   => $hashedPassword,
            ]
        )->create();
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserFactory extends Factory
{

    protected static ?string $password;


    public function definition(): array
    {

        $roles = ['Khách hàng', 'Nhân viên sale', 'Nhân viên kho'];
        return [
            'full_name'  => fake()->name(),
            'email'      => fake()->unique()->email(),
            'role'       => fake()->randomElement($roles),
            'status'     => 'Active',
        ];
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('employees');
    }

 
    public function down(): void
    {
        Schema::create("employees", function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // khóa ngoại lấy từ bảng user
            $table->char('identity_number', length: 12);
            $table->string('bank_account_number', 100);
            $table->Date("hire_date");
        });
    }
};

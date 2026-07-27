<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->String("full_name");
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum("role", ["Khách hàng", 'Nhân viên sale', 'Nhân viên kho', 'Quản trị viên'])->default('Khách hàng');
            $table->enum('status', ['Active', 'Locked'])->default('Active');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create("employees", function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // khóa ngoại lấy từ bảng user
            $table->char('identity_number', length: 12);
            $table->string('bank_account_number', 100);
            $table->Date("hire_date");
        });
        Schema::create("shipping_addresses", function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained("users");
            $table->char('phone_number', length: 12);
            $table->Text('address');
        });
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->String('company_name');
            $table->String("address");
            $table->char('phone_number', length: 12);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }


    public function down(): void
    {

        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('employees');
        Schema::dropIfExists('shipping_addresses');
        Schema::dropIfExists('suppliers');
        Schema::dropIfExists('users');
    }
};

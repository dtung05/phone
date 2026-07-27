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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users');

            $table->enum('order_status', [
                'Chờ xử lý',
                'Đã xác nhận',
                'Đang giao',
                'Thành công',
                'Đã hủy'
            ])->default('Chờ xử lý');

            $table->enum('payment_status', [
                'Unpaid',
                'Paid'
            ])->default('Unpaid');

            $table->enum('payment_method', [
                'cod',
                'vn_pay'
            ]);

            $table->string('recipient_name');
            $table->text('recipient_address');
            $table->string('recipient_phone', 15);

            $table->decimal('total_amount', 15, 2)->default(0);

            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')
                ->constrained('orders');

            $table->foreignId('product_variant_id')
                ->constrained('product_variants');

            $table->string('product_name');
            $table->string('product_thumbnail');
            $table->decimal('unit_price', 15, 2);
            $table->json('variant_attributes')->nullable();
            $table->unsignedInteger('quantity');
            $table->decimal('total_amount', 15, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};

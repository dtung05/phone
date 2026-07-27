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

        Schema::create('purchase_receipts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained('users');

            $table->foreignId('supplier_id')
                ->nullable()
                ->constrained('suppliers');

            $table->date('received_at');
            $table->decimal('total_amount', 15, 2)->default(0);

            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('purchase_receipt_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_receipt_id')
                ->constrained('purchase_receipts');
            $table->foreignId('product_variant_id')
                ->constrained('product_variants');
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->text('note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_receipt_items');
        Schema::dropIfExists('purchase_receipts');
    }
};

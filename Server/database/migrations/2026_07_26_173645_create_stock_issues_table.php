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
        Schema::create('stock_issues', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained('employees');

            $table->string('recipient_name');
            $table->text('recipient_address');
            $table->string('reason');
            $table->date('issued_at');
            $table->text('note')->nullable();
            $table->decimal('total_amount', 15, 2)->default(0);

            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('stock_issue_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stock_issue_id')
                ->constrained('stock_issues');
            $table->foreignId('product_variant_id')
                ->constrained('product_variants');
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->text('note')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_issue_items');
        Schema::dropIfExists('stock_issues');
    }
};

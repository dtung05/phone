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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
                ->constrained('users');

            $table->foreignId('employee_id')
                ->nullable()
                ->constrained('users');

            $table->enum('status', [
                'Processing',
                'Closed'
            ])->default('Processing');

            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conversation_id')
                ->constrained('conversations');

            $table->foreignId('sender_id')
                ->constrained('users');

            $table->text('content');
            $table->timestamp('sent_at');
            $table->boolean('is_read')->default(false);
        });
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users');
            $table->foreignId('product_id')
                ->constrained('products');
            $table->unsignedTinyInteger('rating');
            $table->text('content')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
    }
};

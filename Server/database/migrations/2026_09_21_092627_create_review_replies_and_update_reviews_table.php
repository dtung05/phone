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
        Schema::table('reviews', function (Blueprint $table) {
            $table->boolean('is_read')->default(false)->after('content')->comment('0: Chưa xem, 1: Đã xem');
            $table->boolean('is_replied')->default(false)->after('is_read')->comment('0: Chưa phản hồi, 1: Đã phản hồi');
        });

        Schema::create('review_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_id')->constrained('reviews')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('content')->comment('Nội dung phản hồi từ nhân viên');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review_replies');

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn(['is_read', 'is_replied']);
        });
    }
};

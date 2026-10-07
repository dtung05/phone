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
       
        Schema::dropIfExists('stock_issues_items');
        Schema::dropIfExists('stock_issues'); Schema::dropIfExists('employees');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('messagers');
        Schema::dropIfExists('password_reset_tokens');
    }


    public function down(): void
    {
        //
    }
};

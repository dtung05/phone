<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('brands', function(Blueprint $table){
            $table->id();
            $table->String('name');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('categories', function(Blueprint $table){
            $table->id();
            $table->String('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands');
            $table->foreignId('category_id')->constrained('categories');
            $table->String('product_name');
            $table->String('thumbnail');
            $table->String('review_video');
            $table->integer('discount_perventage');
            $table->json('images');
            $table->json('specifications');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    { 
        Schema::dropIfExists('products');
    Schema::dropIfExists('brands');
        Schema::dropIfExists('categories');
        
       
    }
};

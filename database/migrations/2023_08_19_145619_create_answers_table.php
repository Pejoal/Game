<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('answers', function (Blueprint $table) {
      $table->id();
      $table->text('content')->nullable();
      $table->text('value')->nullable();
      $table->boolean('is_correct')->default(false);
      $table->foreignId('question_id')->constrained()->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('answers');
  }
};

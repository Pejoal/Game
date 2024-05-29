
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('card_groups', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->text('description')->nullable();
      $table->string('type');
      $table->foreignId('story_id')->constrained('stories')->onDelete('cascade');
      $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');

      $table->unique(['type', 'story_id']); // Ensure uniqueness of card in lobby

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('card_groups');
  }
};

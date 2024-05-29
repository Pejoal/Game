<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('lobby_cards', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('card_id')->constrained('cards')->onDelete('cascade');
      $table->foreignId('lobby_id')->constrained('lobbies')->onDelete('cascade');

      $table->unique(['lobby_id', 'card_id']); // Ensure uniqueness of card in lobby
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('lobby_cards');
  }
};

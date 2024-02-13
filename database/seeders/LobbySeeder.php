<?php

namespace Database\Seeders;

use App\Models\Lobby;
use Illuminate\Database\Seeder;

class LobbySeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    Lobby::create([
      'name' => 'Lobby 3',
      'user_id' => '3',
    ]);
  }
}

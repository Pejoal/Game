<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Seeders\LobbySeeder;
use Database\Seeders\SetupSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {

    $this->call([
      SetupSeeder::class,
      LobbySeeder::class,
    ]);

  }

}

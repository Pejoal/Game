<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class SetupSeeder extends Seeder {
  /**
   * Run the database seeds.
   */

  public function run(): void {

    User::create([
      'firstname' => 'Admin',
      'lastname' => '1',
      'username' => 'admin',
      'gender' => 'male',
      'email' => 'admin@mail.com',
      'email_verified_at' => now(),
      'password' => bcrypt('88888888'),
      'type' => 'super admin',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '1',
      'username' => 'client1',
      'gender' => 'female',
      'email' => 'client1@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '2',
      'username' => 'client2',
      'gender' => 'female',
      'email' => 'client2@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

  }
}

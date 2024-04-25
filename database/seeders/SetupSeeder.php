<?php

namespace Database\Seeders;

use App\Models\Lobby;
use App\Models\Story;
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
      'gender' => 'male',
      'email' => 'client1@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '2',
      'username' => 'client2',
      'gender' => 'male',
      'email' => 'client2@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '3',
      'username' => 'client3',
      'gender' => 'female',
      'email' => 'client3@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '4',
      'username' => 'client4',
      'gender' => 'female',
      'email' => 'client4@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    User::create([
      'firstname' => 'client',
      'lastname' => '5',
      'username' => 'client5',
      'gender' => 'female',
      'email' => 'client5@example.com',
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'type' => 'client',
    ]);

    Lobby::create([
      'name' => 'Lobby 1',
      'max_players' => 4,
      'host_id' => 2,
    ]);

    Story::create([
      'name' => 'Story 1',
      'description' => 'Story 1 description',
      'user_id' => 1,
    ]);

    Story::create([
      'name' => 'Story 2',
      'description' => 'Story 2 description',
      'user_id' => 1,
    ]);
  
    // $numbers = range(1, 4);
    // foreach ($numbers as $number) {
    //   Status::create([
    //     'name' => 'Status ' . $number,
    //     'slug' => 'stat' . $number,
    //     'order' => 0,
    //     'project_id' => 1,
    //     'creator_id' => 2,
    //   ]);
    // }

    // $numbers = range(1, 12);
    // foreach ($numbers as $number) {
    //   Task::create([
    //     'title' => 'task ' . $number,
    //     'description' => 'task ' . $number . ' description',
    //     'slug' => 'task' . $number,
    //     'order' => 0,
    //     'status_id' => 1,
    //     'creator_id' => 2,
    //   ]);
    // }

  }
}

<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\CardGroup;
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
      'name' => 'Story Joker',
      'description' => 'Story Description',
      'user_id' => 1,
      'deleted_at' => now(),
    ]);

    CardGroup::create([
      'name' => 'Group 1',
      'description' => 'Group 1 description',
      'type' => "JOKER",
      'story_id' => 1,
      'creator_id' => 2,
    ]);

    Card::create([
      'name' => 'Joker Card',
      'description' => 'Joker Card description',
      'order' => 0,
      'card_group_id' => 1,
      'creator_id' => 1,
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

    $numbers = range(2, 5);
    $i = 1;
    foreach ($numbers as $number) {
      CardGroup::create([
        'name' => 'Group ' . $number,
        'description' => 'Group ' . $number . ' description',
        'type' => $number,
        'story_id' => 2,
        'creator_id' => 2,
      ]);

      $card_numbers = range(1, 4);
      foreach ($card_numbers as $key => $card_number) {
        Card::create([
          'name' => 'Card ' . $i,
          'description' => 'Card ' . $i++ . ' description',
          'order' => $key + 1,
          'card_group_id' => $number,
          'creator_id' => 2,
        ]);
      }
    }

  }
}

<?php

namespace App\Http\Controllers;

use App\Events\LobbyMessageSent;
use App\Events\LobbyStarted;
use App\Events\LobbyTurnChange;
use App\Models\Card;
use App\Models\Lobby;
use App\Models\LobbyCard;
use App\Models\Story;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LobbyController extends Controller {

  public function join(Lobby $lobby) {
    $user = auth()->user();

    if (!$lobby->users()->where('user_id', $user->id)->exists()) {
      $lobby->users()->attach($user->id);
    }

    $stories = Story::get()->toArray();

    return Inertia::render('Lobby/Index', [
      "lobbyId" => $lobby->id,
      "hostId" => $lobby->host_id,
      "name" => $lobby->name,
      "max_players" => $lobby->max_players,
      "stories" => $stories,
    ]);
  }

  public function start(Request $request, Lobby $lobby, Story $story) {
    $userCards = [];
    if (auth()->id() == $lobby->host_id && !LobbyCard::where('lobby_id', $lobby->id)->exists()) {
      $cardGroups = $story->cardGroups()->with('cards')->get();
      $cards = [];

      foreach ($cardGroups as $group) {
        foreach ($group->cards as $card) {
          $cards[] = $card;
        }
      }

      shuffle($cards);

      $users = $lobby->users;
      $userCount = count($users);
      $cardsPerUser = floor(count($cards) / $userCount);

      // Distribute the cards equally among users
      for ($i = 0; $i < $userCount; $i++) {
        $userCards[$users[$i]->id] = array_slice($cards, $i * $cardsPerUser, $cardsPerUser);
      }

      // Handle remaining cards if there are any
      $remainingCards = array_slice($cards, $userCount * $cardsPerUser);
      foreach ($remainingCards as $index => $card) {
        $userCards[$users[$index % $userCount]->id][] = $card;
      }

      // Save the distributed cards in the LobbyCard model
      foreach ($userCards as $user_id => $cards) {
        foreach ($cards as $card) {
          LobbyCard::create([
            'user_id' => $user_id,
            'card_id' => $card->id,
            'lobby_id' => $lobby->id,
          ]);
        }
      }

    }

    $_userCards = LobbyCard::where('lobby_id', $lobby->id)->get();

    foreach ($_userCards as $lobbyCard) {
      $userCards[$lobbyCard->user_id][] = Card::find($lobbyCard->card_id);
    }

    // Determine the maximum number of cards any user has
    $maxCardsCount = max(array_map('count', $userCards));

    // Add "joker" cards to users who have fewer cards than the maximum
    // foreach ($userCards as $userId => &$userCardsArray) {
    //   while (count($userCardsArray) < $maxCardsCount) {
    //     $userCardsArray[] = Card::find(1);
    //   }
    // }

    $user = $request->user();
    broadcast(new LobbyStarted($user, $lobby->id, $story->id))->toOthers();

    $cardGroupTypes = $story->cardGroups()->pluck('type', 'id');

    return Inertia::render('Lobby/Start', [
      "lobbyId" => $lobby->id,
      "hostId" => $lobby->host_id,
      "name" => $lobby->name,
      "max_players" => $lobby->max_players,
      "story" => $story,
      "cardGroupTypes" => $cardGroupTypes,
      "userCards" => $userCards,
    ]);
  }

  public function store(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'max_players' => 'required|integer|min:2|max:4',
    ]);

    $lobby = auth()->user()->lobbies()->create([
      'name' => $request->name,
      'max_players' => $request->max_players,
    ]);
    $lobby->users()->attach(auth()->id());

    return redirect(route('lobby.join', $lobby->id));
  }

  public function turn(Request $request, Lobby $lobby) {
    $user = $request->user();

    // Extract users and current user ID from the request
    $users = $request->users; // Assuming this is an array of user IDs
    $currentUserId = $request->nextUserId;

    // Find the index of the current user in the list
    $currentIndex = array_search($currentUserId, $users);

    // Determine the next user's index in a circular fashion
    $userCount = count($users);
    $nextIndex = ($currentIndex + 1) % $userCount;
    $nextUserId = $users[$nextIndex];

    // Broadcast the event with the next user's ID
    broadcast(new LobbyTurnChange($user, $lobby->id, $request->cards, $nextUserId));
  }

  public function broadcastMessage(Request $request) {
    $user = $request->user();
    broadcast(new LobbyMessageSent($user, $request->content, $request->lobbyId))->toOthers();
  }

  public function delete(Lobby $lobby) {
    if (auth()->user()->id !== $lobby->host_id) {
      abort(403, 'Not Authorized');
    }
    $lobby->delete();
  }

  public function leave(Lobby $lobby, User $user) {
    if ($lobby->users()->where('user_id', $user->id)->exists()) {
      $lobby->users()->detach($user->id);
    }
  }
}

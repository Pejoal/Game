<?php

namespace App\Http\Controllers;
use App\Models\Lobby;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LobbyController extends Controller {
  //

  public function join(Lobby $lobby) {
    $messages = $lobby->messages()->with('user')->get()->map(function ($message) {
      return [
        "id" => $message->id,
        "content" => $message->content,
        "firstname" => $message->user->firstname,
        "lastname" => $message->user->lastname,
      ];
    });

    return Inertia::render('Lobby/Index', [
      "lobbyId" => $lobby->id,
      "name" => $lobby->name,
      "max_players" => $lobby->max_players,
      "messages" => $messages,
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

  }
}

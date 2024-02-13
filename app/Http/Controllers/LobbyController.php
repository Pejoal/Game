<?php

namespace App\Http\Controllers;
use App\Models\Lobby;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LobbyController extends Controller {
  //

  public function join() {
    return Inertia::render('Lobby/Index', [
    ]);
  }

  public function store(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'max_players' => 'required|numeric|max:4',
    ]);

    auth()->user()->lobbies()->create([
      'name' => $request->name,
      'max_players' => $request->max_players,
    ]);
  }
}

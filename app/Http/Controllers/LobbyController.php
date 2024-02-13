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
    auth()->user()->lobbies()->create([
      'name' => $request->name,
    ]);
    // Lobby::create([
    //   "user_id" => $user->id,
    //   'name' => $request->name,
    // ]);
  }
}

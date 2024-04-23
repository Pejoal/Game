<?php

namespace App\Http\Controllers;
use App\Events\LobbyMessageSent;
use App\Events\LobbyStarted;
use App\Models\Lobby;
use App\Models\Mode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LobbyController extends Controller {

  public function join(Lobby $lobby) {
    $modes = Mode::get()->toArray();

    return Inertia::render('Lobby/Index', [
      "lobbyId" => $lobby->id,
      "hostId" => $lobby->host_id,
      "name" => $lobby->name,
      "max_players" => $lobby->max_players,
      "modes" => $modes,
    ]);
  }

  public function start(Request $request, Lobby $lobby) {
    $user = $request->user();
    broadcast(new LobbyStarted($user, $lobby->id))->toOthers();

    return Inertia::render('Lobby/Start', [
      "lobbyId" => $lobby->id,
      "hostId" => $lobby->host_id,
      "name" => $lobby->name,
      "max_players" => $lobby->max_players,
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

    return redirect(route('lobby.join', $lobby->id));
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

}

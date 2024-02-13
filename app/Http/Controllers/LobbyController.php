<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class LobbyController extends Controller {
  //

  public function join() {
    return Inertia::render('Lobby/Index', [
    ]);
  }
}

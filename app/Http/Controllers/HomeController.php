<?php

namespace App\Http\Controllers;

use App\Models\Lobby;
use Inertia\Inertia;

class HomeController extends Controller {

  public function index() {
    $lobbies = Lobby::get()->toArray();
    return Inertia::render('Home', [
      'lobbies' => $lobbies,
    ]);
  }

}
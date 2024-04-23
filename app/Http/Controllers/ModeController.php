<?php

namespace App\Http\Controllers;

use App\Models\Mode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeController extends Controller {

  public function admin(Request $request) {
    $modes = Mode::get();
    return Inertia::render('Admin/Mode/Index', [
      $modes,
    ]);
  }
}

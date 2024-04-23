<?php

namespace App\Http\Controllers;

use App\Models\Mode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeController extends Controller {

  public function admin(Request $request) {
    $modes = Mode::get();
    return Inertia::render('Admin/Mode/Index', [
      "modes" => $modes,
    ]);
  }

  public function store(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'string|nullable|max:2000',
    ]);

    $mode = auth()->user()->modes()->create([
      'name' => $request->name,
      'description' => $request->description,
    ]);

    // return redirect(route('mode.join', $mode->id));
  }

  public function delete(Mode $mode) {
    if (auth()->user()->id !== $mode->user_id) {
      abort(403, 'Not Authorized');
    }

    $mode->delete();
  }
}

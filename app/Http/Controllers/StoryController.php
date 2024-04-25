<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller {

  public function admin(Request $request) {
    $storys = Story::get();
    return Inertia::render('Admin/story/Index', [
      "storys" => $storys,
    ]);
  }

  public function store(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'string|nullable|max:2000',
    ]);

    $story = auth()->user()->storys()->create([
      'name' => $request->name,
      'description' => $request->description,
    ]);

    // return redirect(route('story.join', $story->id));
  }

  public function delete(Story $story) {
    if (auth()->user()->id !== $story->user_id) {
      abort(403, 'Not Authorized');
    }

    $story->delete();
  }
}

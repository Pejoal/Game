<?php

namespace App\Http\Controllers;

use App\Models\CardGroup;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller {

  public function index(Request $request) {
    $stories = Story::get()->toArray();
    return Inertia::render('Admin/Story/Index', [
      "stories" => $stories,
    ]);
  }


  public function show(Story $story) {
    $cardGroups = CardGroup::where('story_id', $story->id)->with('cards')->get()->toArray();
    return Inertia::render('Admin/Story/Page', [
      "story" => $story,
      "cardGroups" => $cardGroups,
    ]);
  }

  public function store(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'string|nullable|max:2000',
    ]);

    $story = auth()->user()->stories()->create([
      'name' => $request->name,
      'description' => $request->description,
    ]);

  }

  public function delete(Story $story) {
    // if (auth()->user()->id !== $story->user_id) {
    //   abort(403, 'Not Authorized');
    // }

    $story->delete();
  }
}

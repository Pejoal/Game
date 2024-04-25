<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardGroupRequest;
use App\Models\Story;

class CardGroupController extends Controller {

  public function store(CardGroupRequest $request, Story $story) {
    $story->cardGroups()->create([
      'name' => $request->name,
      'description' => $request->description,
      'order' => 0,
      'creator_id' => auth()->user()->id,
    ]);
  }

}
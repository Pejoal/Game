<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardGroupRequest;
use App\Models\CardGroup;
use App\Models\Story;

class CardGroupController extends Controller {

  public function store(CardGroupRequest $request, Story $story) {
    if ($request->id) {
      CardGroup::find($request->id)->update([
        'name' => $request->name,
        'description' => $request->description,
        'type' => $request->type,
      ]);
    } else {
      $story->cardGroups()->create([
        'name' => $request->name,
        'description' => $request->description,
        'type' => $request->type,
        'order' => 0,
        'creator_id' => auth()->user()->id,
      ]);
    }
  }

  public function delete(CardGroup $cardGroup) {
    $cardGroup->delete();
  }

}
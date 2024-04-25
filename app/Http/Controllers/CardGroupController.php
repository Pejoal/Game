<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardGroupRequest;
use App\Models\CardGroup;
use App\Models\Story;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CardGroupController extends Controller {

  public function store(CardGroupRequest $request, Story $story) {
    $story->cardGroups()->create([
      'name' => $request->name,
      'order' => 0,
      'slug' => Str::slug($request->name, '-'),
      'creator_id' => auth()->user()->id,
    ]);
  }

  public function sync(Request $request) {
    $request->validate([
      'card_groups' => ['required', 'array'],
    ]);

    foreach ($request->card_groups as $i => $card_group) {
        $order = $i + 1;
        if ($card_group['order'] !== $order) {
          CardGroup::find($card_group['id'])->update(['order' => $order]);
      }
    }

  }

}
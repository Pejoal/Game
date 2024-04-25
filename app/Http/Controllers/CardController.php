<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\CardGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CardController extends Controller {
  public function store(Request $request, cardGroup $cardGroup) {
    $request->validate([
      'title' => ['required', 'string', 'max:56'],
      'description' => ['string', 'nullable'],
    ]);

    return $cardGroup->cards()
      ->create([
        'title' => $request->title,
        'order' => 0,
        'description' => $request->description,
        'creator_id' => auth()->user()->id,
        'slug' => Str::slug($request->name, '-'),
      ]);
  }

  public function sync(Request $request) {
    $request->validate([
      'cardGroupes' => ['required', 'array'],
    ]);

    foreach ($request->cardGroupes as $cardGroup) {
      foreach ($cardGroup['cards'] as $i => $card) {
        $order = $i + 1;
        if ($card['card_group_id'] !== $cardGroup['id'] || $card['order'] !== $order) {

          Card::find($card['id'])->update(['card_group_id' => $cardGroup['id'], 'order' => $order]);

        }
      }
    }

  }
}
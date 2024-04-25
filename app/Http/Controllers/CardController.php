<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\CardGroup;
use Illuminate\Http\Request;

class CardController extends Controller {
  public function store(Request $request, cardGroup $cardGroup) {
    $request->validate([
      'name' => ['required', 'string', 'max:100'],
      'description' => ['string', 'nullable'],
    ]);

    $cardGroup->cards()
      ->create([
        'name' => $request->name,
        'description' => $request->description,
        'order' => 0,
        'creator_id' => auth()->user()->id,
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
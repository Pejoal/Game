<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\CardGroup;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CardController extends Controller {
  public function store(Request $request, cardGroup $cardGroup) {
    $request->validate([
      'name' => ['required', 'string', 'max:100'],
      'order' => [
        'required',
        'numeric',
        Rule::unique('cards')->where(function ($query) use ($cardGroup) {
          return $query->where('card_group_id', $cardGroup->id);
        })->ignore($request->id),
      ],
      'description' => ['string', 'nullable'],
    ]);

    if ($request->id) {
      Card::find($request->id)->update([
        'name' => $request->name,
        'description' => $request->description,
        'order' => $request->order,
      ]);
    } else {
      $cardGroup->cards()
        ->create([
          'name' => $request->name,
          'description' => $request->description,
          'order' => $request->order,
          'creator_id' => auth()->user()->id,
        ]);
    }
  }

  public function delete(Card $card) {
    $card->delete();
  }

  public function sync(Request $request) {
    $request->validate([
      'cardGroups' => ['required', 'array'],
    ]);

    foreach ($request->cardGroups as $cardGroup) {
      foreach ($cardGroup['cards'] as $i => $card) {
        $order = $i + 1;
        if ($card['card_group_id'] !== $cardGroup['id'] || $card['order'] !== $order) {

          Card::find($card['id'])->update(['card_group_id' => $cardGroup['id'], 'order' => $order]);

        }
      }
    }

  }
}
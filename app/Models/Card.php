<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model {
  use HasFactory;

  protected $fillable = ['name','description', 'creator_id',  'order', 'card_group_id'];

  public function users() {
    return $this->belongsToMany(User::class);
  }

  public function cardGroup() {
    return $this->belongsTo(CardGroup::class);
  }

  public function story() {
    return $this->belongsTo(Story::class, 'story_id')->via('cardGroup');
  }

}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model {
  use HasFactory;

  protected $fillable = ['name', 'description'];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function cardGroups() {
    return $this->hasMany(CardGroup::class)->with(['cards'])->orderBy('order', 'ASC');
  }

  public function cards() {
    return $this->hasManyThrough(Card::class, CardGroup::class);
  }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardGroup extends Model {
  use HasFactory;

  protected $fillable = ['name','description', 'creator_id'];

  public function cards() {
    return $this->hasMany(Card::class)->orderBy('order');
  }

  public function story() {
    return $this->belongsTo(Story::class);
  }

}

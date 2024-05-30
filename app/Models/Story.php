<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Story extends Model {
  use HasFactory, SoftDeletes;

  protected $fillable = ['name', 'description'];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function cardGroups() {
    return $this->hasMany(CardGroup::class)->with(['cards']);
  }

  public function cards() {
    return $this->hasManyThrough(Card::class, CardGroup::class);
  }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lobby extends Model
{
  use HasFactory;

  protected $fillable = ['name'];

  public function host() {
    return $this->belongsTo(User::class);
  }
}

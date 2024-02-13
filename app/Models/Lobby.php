<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lobby extends Model {
  use HasFactory;

  protected $fillable = ['name','max_players'];

  public function host() {
    return $this->belongsTo(User::class);
  }

  public function users() {
    return $this->belongsToMany(User::class);
  }

  public function messages() {
    return $this->hasMany(LobbyMessage::class);
  }

}

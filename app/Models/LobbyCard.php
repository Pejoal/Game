<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LobbyCard extends Model {
  use HasFactory;

  protected $fillable = ['card_id', 'user_id', 'lobby_id'];

}

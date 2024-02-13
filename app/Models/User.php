<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail {
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'firstname',
    'lastname',
    'username',
    'type',
    'email_verified_at',
    'gender',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];


  /**
   * Get the user's full name.
   *
   * @return string
   */
  public function getFullNameAttribute() {
    return "{$this->firstname} {$this->lastname}";
  }

  protected function firstname(): Attribute {
    return Attribute::make(
      get: fn($value) => ucfirst($value),
    );
  }

  protected function lastname(): Attribute {
    return Attribute::make(
      get: fn($value) => ucfirst($value),
    );
  }

  protected function username(): Attribute {
    return Attribute::make(
      get: fn($value) => strtolower($value),
    );
  }
}

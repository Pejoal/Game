<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;

class Question extends Model implements TranslatableContract {
  use HasFactory, Translatable;

  public $translatedAttributes = ['content'];
  protected $fillable = ['content', 'type', 'correct_answer'];

  public function answers() {
    return $this->hasMany(Answer::class);
  }

}

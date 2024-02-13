<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model implements TranslatableContract {
  use HasFactory, Translatable;

  public $translatedAttributes = ['content', 'value'];
  protected $fillable = ['content', 'value', 'question_id', 'is_correct'];

  protected $casts = [
    'is_correct' => 'boolean',
  ];

  public function question() {
    return $this->belongsTo(Question::class);
  }

}

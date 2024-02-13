<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class QuestionController extends Controller {
  public function showByType($type) {
    $questions = Question::where('type', $type)->get();

    return inertia('Questions/Index', [
      'questions' => $questions,
      'type' => $type,
    ]);
  }

  public function store(Request $request) {
    $data = $request->all();

    $langs = array_keys(LaravelLocalization::getSupportedLocales());
    $contents = [];
    $answers = [];

    foreach ($langs as $lang) {
      if (isset($data[$lang])) {
        $contents[$lang] = [
          "content" => $data[$lang]['content'] ?? '',
        ];
      }
    }

    $question = Question::create([
      ...$contents,
      'type' => $data['type'],
    ]);

    foreach ($data['answers'] as $answer) {
      foreach ($langs as $lang) {
        if (isset($answer[$lang])) {
          $answers['is_correct'] = $answer['is_correct'];
          if ($data['type'] === 'math') {
            $answers[$lang] = [
              "value" => $answer[$lang]['content'] ?? '',
            ];
          } else {
            $answers[$lang] = [
              "content" => $answer[$lang]['content'] ?? '',
            ];
          }
        }
      }

      if ($data['type'] === 'math') {
        Answer::create([
          ...$answers,
          'question_id' => $question->id,
          'is_correct' => true,
        ]);
      } else {
        Answer::create([
          ...$answers,
          'question_id' => $question->id,
          'is_correct' => $answer['is_correct'],
        ]);
      }
    }

    if ($data['type'] === 'photo' && $request->hasFile('photo')) {
      $request->validate([
        'photo' => ['image', 'mimes:jpeg,png,jpg', 'max:30000'],
      ]);
      $path = $request->file('photo')->store('public/questions/photos');
      $question->photo = Storage::url($path);
      $question->save();
    }

    if ($data['type'] === 'video' && $request->hasFile('video')) {
      $request->validate([
        'video' => ['required', 'mimes:mp4,avi,wmv', 'max:50000'],
      ]);
      $path = $request->file('video')->store('public/questions/videos');
      $question->video = Storage::url($path);
      $question->save();
    }

  }

  public function get(Question $question) {
    // $question->load('answers');
    // $question->getTranslationsArray();
    $question = Question::with(['answers'])->find($question->id)->toArray();

    $formattedQuestion = [
      "id" => $question["id"],
      "content" => $question["content"],
    ];

    foreach ($question["translations"] as $translation) {
      $locale = $translation["locale"];
      $content = $translation["content"];
      $formattedQuestion[$locale] = ["content" => $content];
    }

    foreach ($question["answers"] as $answer) {
      $answerData = [];

      foreach ($answer["translations"] as $translation) {
        $locale = $translation["locale"];
        $answerData['id'] = $answer["id"];
        $answerData['is_correct'] = $answer["is_correct"];

        $answerData[$locale] = [
          "content" => $translation["content"],
          "value" => $translation["value"],
        ];
      }

      $formattedQuestion["answers"][] = $answerData;
    }

    return $formattedQuestion;
  }

  public function update(Request $request, Question $question) {
    $data = $request->all();

    $langs = array_keys(LaravelLocalization::getSupportedLocales());
    $contents = [];

    foreach ($langs as $lang) {
      if (isset($data[$lang])) {
        $contents[$lang] = [
          "content" => $data[$lang]['content'] ?? '',
          "value" => $data[$lang]['value'] ?? '',
        ];
      }
    }

    $question->update([
      ...$contents,
    ]);

    foreach ($data['answers'] as $answer) {
      $answerData = [];

      foreach ($langs as $lang) {
        if (isset($answer[$lang])) {
          $answerData['is_correct'] = $answer['is_correct'];
          if ($data['type'] === 'math') {
            $answerData[$lang] = [
              "value" => $answer[$lang]['value'] ?? '',
            ];
          } else {
            $answerData[$lang] = [
              "content" => $answer[$lang]['content'] ?? '',
            ];
          }
        }
      }
      Answer::find($answer['id'])->update($answerData);
    }

  }

  public function updatePhoto(Request $request, Question $question) {
    if ($request->hasFile('photo')) {
      $request->validate([
        'photo' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:30000'],
      ]);
      $path = $request->file('photo')->store('public/questions/photos');
      $question->photo = Storage::url($path);
      $question->save();
    }
  }

  public function updateVideo(Request $request, Question $question) {
    if ($request->hasFile('video')) {
      $request->validate([
        'video' => ['required', 'mimes:mp4,avi,wmv', 'max:50000'],
      ]);
      $path = $request->file('video')->store('public/questions/videos');
      $question->video = Storage::url($path);
      $question->save();
    }
  }

  public function destroy(Question $question) {
    $question->deleteTranslations();
    $question->delete();
  }
}

<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller {
  public function client(Request $request) {
    $text_questions_count = Question::where('type', 'text')->count();
    $math_questions_count = Question::where('type', 'math')->count();
    $photo_questions_count = Question::where('type', 'photo')->count();
    $video_questions_count = Question::where('type', 'video')->count();
    return Inertia::render('Quiz/Client', [
      'test_questions_count' => 30,
      'text_questions_count' => $text_questions_count,
      'math_questions_count' => $math_questions_count,
      'photo_questions_count' => $photo_questions_count,
      'video_questions_count' => $video_questions_count,
    ]);
  }

  public function quizByType($type) {
    if ($type !== 'test') {
      $questions = Question::where('type', $type)->with('answers', function ($query) {
        $query->inRandomOrder();
      })->inRandomOrder()->get()->map(function ($question) {

        $answers = $question->answers->map(function ($answer) {
          return [
            'id' => $answer->id,
            'content' => $answer->content,
          ];
        });

        return [
          'id' => $question->id,
          'content' => $question->content,
          'type' => $question->type,
          'photo' => $question->photo,
          'video' => $question->video,
          'answers' => $answers,
        ];
      });
    } else {
      $questions = Question::inRandomOrder()->with('answers', function ($query) {
        $query->inRandomOrder();
      })->take(30)->get()->map(function ($question) {

        $answers = $question->answers->map(function ($answer) {
          return [
            'id' => $answer->id,
            'content' => $answer->content,
          ];
        });

        return [
          'id' => $question->id,
          'content' => $question->content,
          'type' => $question->type,
          'photo' => $question->photo,
          'video' => $question->video,
          'answers' => $answers,
        ];
      });
    }
    return Inertia::render('Quiz/Start', [
      "type" => $type,
      "questions" => $questions,
    ]);
  }

  public function admin(Request $request) {
    $text_questions_count = Question::where('type', 'text')->count();
    $math_questions_count = Question::where('type', 'math')->count();
    $photo_questions_count = Question::where('type', 'photo')->count();
    $video_questions_count = Question::where('type', 'video')->count();

    return Inertia::render('Quiz/Admin', [
      'text_questions_count' => $text_questions_count,
      'math_questions_count' => $math_questions_count,
      'photo_questions_count' => $photo_questions_count,
      'video_questions_count' => $video_questions_count,
    ]);
  }

  public function submitAnswers(Request $request) {
    $result = 0;
    foreach ($request->all() as $answer_group) {
      if (!$answer_group['math']['content']) {
        if (!$answer_group['answer_ids']) {
          continue;
        }
        $number_of_correct_answers = 0;
        $question = Answer::find($answer_group['answer_ids'][0])->question;
        $answers = Question::find($question->id)->answers->pluck('is_correct');
        $question_correct_answers_count = 0;
        foreach ($answers as $answer) {
          if ($answer === true) {
            $question_correct_answers_count++;
          }
        }
        foreach ($answer_group['answer_ids'] as $answer_id) {
          $is_correct = Answer::find($answer_id)->is_correct;
          if ($is_correct) {
            $number_of_correct_answers++;
          }
        }
        if ($number_of_correct_answers === $question_correct_answers_count) {
          $result++;
        }
      } else {
        $value = Answer::find($answer_group['math']['answer_id'])->value;
        if ($value == $answer_group['math']['content']) {
          $result++;
        }

      }
    }
    return $result;
  }
}

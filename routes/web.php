<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\LobbyController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */
Route::group([], function () {
  $locales = collect(LaravelLocalization::getSupportedLocales())->map(function ($properties, $localeCode) {
    return [
      'code' => $localeCode,
      'native' => $properties['native'],
      'url' => LaravelLocalization::getLocalizedURL($localeCode, null, [], true),
      'emoji' => $properties['emoji'],
    ];
  });
  Inertia::share([
    'locales' => $locales,
    'active_locale_code' => LaravelLocalization::getCurrentLocale(),
  ]);

  Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //   'canLogin' => Route::has('login'),
    //   'canRegister' => Route::has('register'),
    //   'laravelVersion' => Application::VERSION,
    //   'phpVersion' => PHP_VERSION,
    // ]);
    if (auth()->check()) {
      if (in_array(auth()->user()->type, ['super admin', 'admin'])) {
        return redirect(route('admin.dashboard'));
      } else if (auth()->user()->type === 'client') {
        return redirect(route('home'));
      }
    }
    return redirect(route('login'));

  });

  require __DIR__ . '/auth.php';
  
  Route::get('home', [HomeController::class, 'index'])->name('home');
  
  Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('profile/photo/update', [ProfileController::class, 'updateProfilePhoto'])->name('profile.photo.update');

    // User
    Route::group(['middleware' => 'clients-only'], function () {
      Route::get('user/profile', [ProfileController::class, 'myProfile'])->name('user.profile.me');
      Route::get('lobby/{lobby}/join', [LobbyController::class, 'join'])->name('lobby.join');
      Route::post('lobby/store', [LobbyController::class, 'store'])->name('lobby.store');

    });

    // Admin
    Route::group(['middleware' => 'admins-only'], function () {
      Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
      Route::post('admin/logo/update', [AdminController::class, 'updateLogo'])->name('admin.logo.update');

      Route::get('quiz/admin', [QuizController::class, 'admin'])->name('quiz.admin');

      Route::get('questions/{type}', [QuestionController::class, 'showByType'])->name('questions.showByType');
      Route::post('question/store', [QuestionController::class, 'store'])->name('question.store');
      Route::get('question/{question}/get', [QuestionController::class, 'get'])->name('question.get');
      Route::put('question/{question}/update', [QuestionController::class, 'update'])->name('question.update');
      Route::delete('question/{question}/delete', [QuestionController::class, 'destroy'])->name('question.destroy');
      Route::post('question/{question}/photo/update', [QuestionController::class, 'updatePhoto'])->name('question.photo.update');
      Route::post('question/{question}/video/update', [QuestionController::class, 'updateVideo'])->name('question.video.update');

    });

  });

});
Route::fallback(function () {
  return redirect('/');
});
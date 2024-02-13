<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BusinessHourController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
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
  Route::post('home/store', [HomeController::class, 'storeHome'])->name('home.store');
  Route::get('imprint', [HomeController::class, 'imprint'])->name('imprint');
  Route::post('imprint/store', [HomeController::class, 'storeImprint'])->name('imprint.store');
  Route::get('data-protection', [HomeController::class, 'data_protection'])->name('data-protection');
  Route::post('data-protection/store', [HomeController::class, 'storeDataProtection'])->name('data-protection.store');

  Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('profile/photo/update', [ProfileController::class, 'updateProfilePhoto'])->name('profile.photo.update');

    Route::put('appointment/{appointment}/update', [AppointmentController::class, 'update'])->name('appointment.update');
    Route::delete('appointment/{appointment}/delete', [AppointmentController::class, 'delete'])->name('appointment.delete');

    // User
    Route::group(['middleware' => 'clients-only'], function () {
      Route::get('user/profile', [ProfileController::class, 'myProfile'])->name('user.profile.me');

      Route::get('quiz/client', [QuizController::class, 'client'])->name('quiz.client');
      Route::get('quiz/type/{type}', [QuizController::class, 'quizByType'])->name('quiz.quizByType');
      Route::post('quiz/submitAnswers', [QuizController::class, 'submitAnswers'])->name('quiz.submitAnswers');

      Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments.index');
      Route::post('appointment/reserve', [AppointmentController::class, 'reserve'])->name('appointment.reserve');
      Route::delete('appointment/{appointment}/cancel', [AppointmentController::class, 'cancel'])->name('appointment.cancel');
    });

    // Admin
    Route::group(['middleware' => 'admins-only'], function () {
      Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
      Route::get('admin/screens', [AdminController::class, 'screens'])->name('admin.screens');
      Route::post('admin/logo/update', [AdminController::class, 'updateLogo'])->name('admin.logo.update');

      Route::put('appointment/{appointment}/approve', [AppointmentController::class, 'approve'])->name('appointment.approve');
      Route::put('appointment/{appointment}/decline', [AppointmentController::class, 'decline'])->name('appointment.decline');

      Route::get('quiz/admin', [QuizController::class, 'admin'])->name('quiz.admin');

      Route::get('questions/{type}', [QuestionController::class, 'showByType'])->name('questions.showByType');
      Route::post('question/store', [QuestionController::class, 'store'])->name('question.store');
      Route::get('question/{question}/get', [QuestionController::class, 'get'])->name('question.get');
      Route::put('question/{question}/update', [QuestionController::class, 'update'])->name('question.update');
      Route::delete('question/{question}/delete', [QuestionController::class, 'destroy'])->name('question.destroy');
      Route::post('question/{question}/photo/update', [QuestionController::class, 'updatePhoto'])->name('question.photo.update');
      Route::post('question/{question}/video/update', [QuestionController::class, 'updateVideo'])->name('question.video.update');

      Route::get('business-hours', [BusinessHourController::class, 'index'])->name('business_hours');
      Route::post('business-hours', [BusinessHourController::class, 'update'])->name('business_hours.update');
    });

  });

});
Route::fallback(function () {
  return redirect('/');
});
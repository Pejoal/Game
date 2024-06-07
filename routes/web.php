<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\CardGroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LobbyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Support\Facades\Redis;
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

  Route::get('/publish', function () {
    Redis::publish('test-channel', json_encode(['foo' => 'bar']));
    return 'Message published';
  });

  require __DIR__ . '/auth.php';

  Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('profile/photo/update', [ProfileController::class, 'updateProfilePhoto'])->name('profile.photo.update');

    // User
    Route::group(['middleware' => 'clients-only'], function () {
      Route::get('home', [HomeController::class, 'index'])->name('home');

      Route::get('user/profile', [ProfileController::class, 'myProfile'])->name('user.profile.me');

      Route::get('lobby/{lobby}/join', [LobbyController::class, 'join'])->name('lobby.join');
      Route::delete('lobby/{lobby}/delete', [LobbyController::class, 'delete'])->name('lobby.delete');
      Route::delete('lobby/{lobby}/user/{user}/leave', [LobbyController::class, 'leave'])->name('lobby.leave');
      Route::get('lobby/{lobby}/story/{story}/start', [LobbyController::class, 'start'])->name('lobby.start');
      Route::post('lobby/store', [LobbyController::class, 'store'])->name('lobby.store');
      Route::post('lobby/{lobby}/turn', [LobbyController::class, 'turn'])->name('lobby.turn');
      Route::post('lobby/{lobby}/win', [LobbyController::class, 'win'])->name('lobby.win');
      Route::post('/lobby_message', [LobbyController::class, 'broadcastMessage']);

      Route::put('card/sync', [CardController::class, 'sync'])->name('card.sync');

    });

    // Admin
    Route::group(['middleware' => 'admins-only'], function () {
      Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

      Route::get('admin/storys', [StoryController::class, 'index'])->name('admin.story');
      Route::get('admin/storys/{story}', [StoryController::class, 'show'])->name('story.show');
      Route::post('admin/storys/{story}/updatePDF', [StoryController::class, 'updatePDF'])->name('story.updatePDF');

      Route::post('admin/story/store', [StoryController::class, 'store'])->name('story.store');
      Route::post('admin/story/{story}/delete', [StoryController::class, 'delete'])->name('story.delete');

      Route::post('admin/story/{story}/card-group/', [CardGroupController::class, 'store'])->name('card.group.store');
      Route::post('admin/card-group/{cardGroup}/delete', [CardGroupController::class, 'delete'])->name('card.group.delete');

      Route::post('admin/card-group/{cardGroup}/card/', [CardController::class, 'store'])->name('card.store');
      Route::post('admin/card/{card}/delete', [CardController::class, 'delete'])->name('card.delete');

    });

  });

});
Route::fallback(function () {
  return redirect('/');
});
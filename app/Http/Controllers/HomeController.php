<?php

namespace App\Http\Controllers;

use App\Models\Screen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {

  public function index() {
    $screen = Screen::where('name', 'home')->first();
    return Inertia::render('Home', [
      'screen' => $screen,
    ]);
  }

  public function storeHome(Request $request) {
    Screen::where('name', 'home')->first()->update([
      'content' => $request->content,
    ]);
  }

  public function imprint() {
    $screen = Screen::where('name', 'imprint')->first();
    return Inertia::render('Imprint/Index', [
      'screen' => $screen,
    ]);
  }

  public function storeImprint(Request $request) {
    Screen::where('name', 'imprint')->first()->update([
      'content' => $request->content,
    ]);
  }

  public function data_protection() {
    $screen = Screen::where('name', 'data_protection')->first();
    return Inertia::render('DataProtection/Index', [
      'screen' => $screen,
    ]);
  }

  public function storeDataProtection(Request $request) {
    Screen::where('name', 'data_protection')->first()->update([
      'content' => $request->content,
    ]);
  }

}

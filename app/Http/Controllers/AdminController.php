<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller {
  public function dashboard(Request $request) {
    return Inertia::render('Admin/Dashboard', [
    ]);
  }

  public function updateLogo(Request $request) {
    if ($request->hasFile('logo')) {
      $request->validate([
        // 'logo' => ['required', 'image', 'max:1024'], // Maximum file size of 1MB
        'logo' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:50000'],
      ]);
      $path = $request->file('logo')->store('public/logos');

      $settings = Settings::first();
      $settings->logo = Storage::url($path);
      $settings->save();

    }
    return;
  }

}

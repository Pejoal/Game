<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller {

  public function myProfile() {

    $currentDateTime = new \DateTime();
    $appointments = auth()->user()->appointments()->orderBy('date', 'DESC')->orderBy('time', 'DESC')->get()->map(function ($appointment) use ($currentDateTime) {
      $dateTimeString = $appointment->date . ' ' . $appointment->time->format('H:i:s');
      $targetDateTime = new \DateTime($dateTimeString);
      $timeDifference = $currentDateTime->diff($targetDateTime);
      $timeDifferenceInSeconds = $timeDifference->s + ($timeDifference->i * 60) + ($timeDifference->h * 3600) + ($timeDifference->d * 86400); 
      if ($timeDifferenceInSeconds < 86400) {
        $more_than_24_hours = false;
      } else {
        $more_than_24_hours = true;
      }
      return [
        "id" => $appointment->id,
        "date" => $appointment->date,
        "time" => $appointment->time->format('H:i'),
        "status" => $appointment->status,
        "location" => $appointment->location,
        "notes" => $appointment->notes,
        "more_than_24_hours" => $more_than_24_hours,
      ];
    });
    // $currentDate = now()->format('Y-m-d');

    $upcomingDates = $appointments->filter(function ($appointment) use ($currentDateTime) {
      $dateTimeString = $appointment['date'] . ' ' . $appointment['time'];
      $targetDateTime = new \DateTime($dateTimeString);
      return $targetDateTime > $currentDateTime;
    });

    $previousDates = $appointments->filter(function ($appointment) use ($currentDateTime) {
      $dateTimeString = $appointment['date'] . ' ' . $appointment['time'];
      $targetDateTime = new \DateTime($dateTimeString);
      return $targetDateTime <= $currentDateTime;
    });

    // Convert the collections back to arrays
    // $upcomingDatesArray = $upcomingDates->all();

    return Inertia::render('User/Index', [
      'previousDates' => $previousDates,
      'upcomingDates' => $upcomingDates,
    ]);
  }

  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response {
    return Inertia::render('Profile/Edit', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => session('status'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse {
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit');
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse {
    $request->validate([
      'password' => ['required', 'current-password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }

  public function updateProfilePhoto(Request $request) {
    if ($request->hasFile('profile_photo')) {
      $request->validate([
        // 'profile_photo' => ['required', 'image', 'max:1024'], // Maximum file size of 1MB
        'profile_photo' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:50000'],
      ]);
      $path = $request->file('profile_photo')->store('public/profiles');
      auth()->user()->profile_photo_url = Storage::url($path);
      auth()->user()->save();

      // return response()->json(['path' => Storage::url($path)], 200);
    }
    return;
  }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusinessHoursRequest;
use App\Models\BusinessHour;
use Inertia\Inertia;

class BusinessHourController extends Controller {
  public function index() {
    $businessHours = BusinessHour::all();

    return Inertia::render('BusinessHour/Index', [
      'businessHours' => $businessHours,
    ]);
  }

  public function update(BusinessHoursRequest $request) {

    BusinessHour::query()->upsert($request->validated()['data'], ['day']);

    return back();
  }
}
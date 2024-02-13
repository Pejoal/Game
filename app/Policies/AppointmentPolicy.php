<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;

class AppointmentPolicy {
  /**
   * Determine whether the user can Delete or Update the model.
   */
  public function update(User $user, Appointment $appointment): bool {
    return $user->id === $appointment->user_id || $user->type === 'super admin' || $user->type === 'admin';
  }

}

<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
 */

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{lobbyId}', function (User $user, int $lobbyId) {
  return ['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname];
});

Broadcast::channel('chat.group.{chatGroupId}', function (User $user, int $chatGroupId) {
  if (!$user->joinedChatGroups->contains($chatGroupId)) {
    abort(403, 'Not Authorized');
  }
  return ['id' => $user->id];
});
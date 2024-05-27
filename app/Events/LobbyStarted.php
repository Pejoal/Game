<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LobbyStarted implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $user;
  public $lobbyId;
  public $story_id;
  public function __construct(User $user, int $lobbyId,int $story_id) {
    $this->user = $user;
    $this->lobbyId = $lobbyId;
    $this->story_id = $story_id;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array {
    return [
      new PresenceChannel('chat.' . $this->lobbyId),
    ];
  }

  public function broadcastWith(): array {
    return [
      "user_id" => $this->user->id,
      "story_id" => $this->story_id,
      "firstname" => $this->user->firstname,
      "lastname" => $this->user->lastname,
    ];
  }
}

<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LobbyTurnChange implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;
  public $user;

  public $lobbyId;
  public $cards;
  public $nextUserId;

  public function __construct(User $user, int $lobbyId, array $cards,int $nextUserId) {
    $this->user = $user;
    $this->lobbyId = $lobbyId;
    $this->cards = $cards;
    $this->nextUserId = $nextUserId;
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
      "cards" => $this->cards,
      "nextUserId" => $this->nextUserId,
    ];
  }
}

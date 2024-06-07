<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class RedisSubscriber extends Command {
  protected $signature = 'redis:subscribe';
  protected $description = 'Subscribe to a Redis channel';

  public function __construct() {
    parent::__construct();
  }

  public function handle() {
    $this->info('Subscribing to Redis channel...');

    Redis::subscribe(['test-channel'], function ($message) {
      $this->info('Received message: ' . $message);
    });
  }
}

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../../../../config/env';
import { DisabledRedisClient } from './disabled-redis.client';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis | DisabledRedisClient;

  constructor() {
    this.client = env.CACHE_URL
      ? new Redis(env.CACHE_URL)
      : new DisabledRedisClient();
  }

  ping(): Promise<string> {
    return this.client.ping();
  }

  onModuleDestroy() {
    return this.client.disconnect();
  }
}

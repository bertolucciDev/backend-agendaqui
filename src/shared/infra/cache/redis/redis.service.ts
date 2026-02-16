import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../../../../config/env';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super(env.CACHE_URL, {
      retryStrategy: (times) => (times >= 2 ? null : 2000),
    });
  }

  onModuleDestroy() {
    return this.disconnect();
  }
}

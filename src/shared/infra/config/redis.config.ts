import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../../../config/env';
import { DisabledRedisClient } from '../cache/redis/disabled-redis.client';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider: Provider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: (): Redis => {
    const url = env.CACHE_URL;

    if (!url) {
      return new DisabledRedisClient() as unknown as Redis;
    }

    return new Redis(url, {
      maxRetriesPerRequest: 2,
      retryStrategy: (times: number) => (times >= 2 ? null : 2000),
      enableReadyCheck: true,
      lazyConnect: false,
    });
  },
};

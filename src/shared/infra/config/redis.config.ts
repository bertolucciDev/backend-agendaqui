import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../../../config/env';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider: Provider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: (): Redis => {
    const url = env.CACHE_URL;

    if (!url) {
      throw new Error('CACHE_URL is not defined');
    }

    return new Redis(url, {
      maxRetriesPerRequest: 2,
      retryStrategy: (times: number) => (times >= 2 ? null : 2000),
      enableReadyCheck: true,
      lazyConnect: false,
    });
  },
};

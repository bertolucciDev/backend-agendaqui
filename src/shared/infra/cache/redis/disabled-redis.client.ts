import { Logger } from '@nestjs/common';

const disabledRedisLogger = new Logger('DisabledRedisClient');

export class DisabledRedisClient {
  private store = new Map<string, string>();

  constructor() {
    disabledRedisLogger.warn(
      'CACHE_URL is not configured. Redis integration is running in degraded mode.',
    );
  }

  async set(key: string, value: string): Promise<'OK'> {
    this.store.set(key, value);
    return 'OK';
  }

  async setex(key: string, _seconds: number, value: string): Promise<'OK'> {
    this.store.set(key, value);
    return 'OK';
  }

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async del(...keys: string[]): Promise<number> {
    let deleted = 0;
    for (const key of keys) {
      if (this.store.delete(key)) {
        deleted += 1;
      }
    }
    return deleted;
  }

  async exists(key: string): Promise<number> {
    return this.store.has(key) ? 1 : 0;
  }

  async scan(
    cursor: string,
    _matchKeyword: string,
    pattern: string,
    _countKeyword: string,
    _count: number,
  ): Promise<[string, string[]]> {
    const regex = new RegExp(`^${pattern.replace('*', '.*')}$`);
    const keys = [...this.store.keys()].filter((key) => regex.test(key));
    return [cursor === '0' ? '0' : '0', keys];
  }

  async ping(): Promise<string> {
    return 'DISABLED';
  }

  disconnect(): void {
    this.store.clear();
  }
}

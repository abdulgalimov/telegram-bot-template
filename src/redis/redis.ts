import type { KvStore } from '@abdulgalimov/telegram';
import { Redis } from 'ioredis';
import { redisConfig } from '../config';
import { JSONBigIntParse, JSONBigIntStringify } from '../utils';

export class RedisKvStore implements KvStore {
  private readonly redis: Redis;
  public constructor() {
    this.redis = new Redis(redisConfig);
  }

  public async stop() {
    await this.redis.quit();
  }

  async getValue<V>(key: string): Promise<V | null> {
    const raw = await this.redis.get(key);
    if (raw === null) return null;
    return JSONBigIntParse(raw) as V;
  }

  async setValue<V>(key: string, value: V, options?: { expireTime?: number }): Promise<void> {
    const serialized = JSONBigIntStringify(value);

    if (options?.expireTime) {
      await this.redis.set(key, serialized, 'EX', options.expireTime);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async removeValue(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redis.expire(key, seconds);
  }
}

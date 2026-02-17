import { Token } from '../../../../core/value-objects/token.vo';

export interface SessionData {
  refreshToken: Token;
}

export abstract class AbstractAuthTokenCacheWriteRepository {
  abstract setRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number,
  ): Promise<void>;

  abstract deleteRefreshToken(refreshToken: string): Promise<void>;

  abstract setSession(
    userId: string,
    data: SessionData,
    ttl: number,
  ): Promise<void>;

  abstract deleteSession(userId: string): Promise<void>;

  abstract addToBlacklist(token: string, ttl: number): Promise<void>;
}

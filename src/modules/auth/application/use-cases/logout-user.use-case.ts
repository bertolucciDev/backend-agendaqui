import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { AbstractAuthTokenCacheWriteRepository } from '../../domain/repositories/auth-token-cache.write-repository';
import { AbstractAuthTokenCacheReadRepository } from '../../domain/repositories/auth-token-cache.read-repository';
import { LogoutDTO } from '../../presentation/dto/input/logout.dto';
import { REDIS_CLIENT } from '../../../../shared/infra/config/redis.config';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    @Inject(REDIS_CLIENT) private readonly client: Redis,
    private readonly authTokenCacheWriteRepository: AbstractAuthTokenCacheWriteRepository,
    private readonly authTokenCacheReadRepository: AbstractAuthTokenCacheReadRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(dto: LogoutDTO) {
    const { userId, refreshToken } = dto;
    const lockKey = `logout-lock:${dto.refreshToken}`;

    const user = await this.userReadRepository.findById(dto.userId);
    if (!user) {
      return false;
    }

    const gotLock = await this.client.set(lockKey, '1', 'EX', 5, 'NX');
    if (!gotLock) {
      return false;
    }

    try {
      const storedUserId =
        await this.authTokenCacheReadRepository.getUserIdByToken(refreshToken);

      if (!storedUserId || storedUserId !== userId) {
        return false;
      }

      await this.authTokenCacheWriteRepository.deleteRefreshToken(refreshToken);
      await this.authTokenCacheWriteRepository.deleteSession(userId);

      return true;
    } finally {
      await this.client.del(lockKey);
    }
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '../../shared/infra/cache/cache.module';
import { env } from '../../config/env';

import { AbstractUserWriteRepository } from '../../modules/user/domain/repositories/user.write-repository';
import { AbstractUserReadRepository } from '../user/domain/repositories/user.read-repository';
import { AbstractAuthTokenCacheReadRepository } from './domain/repositories/auth-token-cache.read-repository';
import { AbstractAuthTokenCacheWriteRepository } from './domain/repositories/auth-token-cache.write-repository';
import { RedisAuthTokenCacheQueryRepository } from './infra/repositories/cache/redis-auth.query.repository';
import { RedisAuthTokenCommandCacheRepository } from './infra/repositories/cache/redis-auth.command.repository';
import { AbstractVerificationRepository } from '../../modules/auth/domain/repositories/verify.repository';
import { PrismaUserReadRepository } from '../user/infra/repositories/database/prisma-user.read-repository';
import { PrismaUserWriteRepository } from '../user/infra/repositories/database/prisma-user.write-repository';
import { PrismaPasswordResetTokenRepository } from '../../modules/auth/infra/repositories/database/prisma-auth.repository';

import { RequestPasswordResetUseCase } from './application/use-cases/request-password-reset.use-case';
import { LogoutUserUseCase } from './application/use-cases/logout-user.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { PasswordResetUseCase } from './application/use-cases/password-reset.use-case';
import { VerifyEmailUseCase } from './application/use-cases/verify-email.use-case';

import { JwtStrategy } from '../../modules/auth/infra/strategies/jwt-strategy';
import { parseTimeToSeconds } from '../../shared/utils/time.util';

import { LoginAuthController } from './presentation/controllers/login-auth.controller';
import { RegisterAuthController } from './presentation/controllers/register-auth.controller';
import { VerifyEmailAuthController } from './presentation/controllers/verify-email-auth.controller';
import { LogoutAuthController } from './presentation/controllers/logout-auth.controller';
import { RequestPasswordResetAuthController } from './presentation/controllers/request-password-reset-auth.controller';
import { PasswordResetAuthController } from './presentation/controllers/password-reset-auth.controller';
import { MeUseCase } from './application/use-cases/me.use-case';
import { MeAuthController } from './presentation/controllers/me-auth.controller';

const WriteUseCases = [
  RegisterUseCase,
  LogoutUserUseCase,
  RequestPasswordResetUseCase,
  PasswordResetUseCase,
  VerifyEmailUseCase,
  MeUseCase,
];

const ReadUseCases = [LoginUseCase];

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: parseTimeToSeconds(env.ACCESS_TOKEN_EXP) },
    }),
    CacheModule,
  ],
  controllers: [
    LoginAuthController,
    RegisterAuthController,
    VerifyEmailAuthController,
    PasswordResetAuthController,
    RequestPasswordResetAuthController,
    LogoutAuthController,
    MeAuthController,
  ],
  providers: [
    JwtStrategy,
    {
      provide: AbstractUserWriteRepository,
      useClass: PrismaUserWriteRepository,
    },
    {
      provide: AbstractUserReadRepository,
      useClass: PrismaUserReadRepository,
    },
    {
      provide: AbstractVerificationRepository,
      useClass: PrismaPasswordResetTokenRepository,
    },
    {
      provide: AbstractAuthTokenCacheReadRepository,
      useClass: RedisAuthTokenCacheQueryRepository,
    },
    {
      provide: AbstractAuthTokenCacheWriteRepository,
      useClass: RedisAuthTokenCommandCacheRepository,
    },
    ...WriteUseCases,
    ...ReadUseCases,
  ],
  exports: [],
})
export class AuthModule {}

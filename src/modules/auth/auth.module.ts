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
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { CreateUserSessionUseCase } from './application/use-cases/create-user-session.use-case';
import { VerifyRecoveryUseCase } from './application/use-cases/verify-recovery.use-case';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { VerifyEmailUseCase } from './application/use-cases/verify-email.use-case';

import { JwtStrategy } from '../../modules/auth/infra/strategies/jwt-strategy';
import { parseTimeToSeconds } from '../../shared/utils/time.util';

import { SignInAuthController } from './presentation/controllers/sign-in-auth.controller';
import { SignUpAuthController } from './presentation/controllers/sign-up-auth.controller';
import { VerifyEmailAuthController } from './presentation/controllers/verify-email-auth.controller';
import { LogoutAuthController } from './presentation/controllers/logout-auth.controller';
import { RequestPasswordResetAuthController } from './presentation/controllers/request-password-reset-auth.controller';
// import { VerifyResetPasswordAuthController } from './presentation/controllers/reset-password-auth.controller';

const WriteUseCases = [
  SignUpUseCase,
  CreateUserSessionUseCase,
  LogoutUserUseCase,
  RequestPasswordResetUseCase,
  ResetPasswordUseCase,
  VerifyEmailUseCase,
  VerifyRecoveryUseCase,
];

const ReadUseCases = [SignInUseCase];

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: parseTimeToSeconds(env.ACCESS_TOKEN_EXP) },
    }),
    CacheModule,
  ],
  controllers: [
    SignInAuthController,
    SignUpAuthController,
    VerifyEmailAuthController,
    RequestPasswordResetAuthController,
    // VerifyResetPasswordAuthController,
    LogoutAuthController,
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
    {
      provide: AbstractVerificationRepository,
      useClass: PrismaPasswordResetTokenRepository,
    },
    ...WriteUseCases,
    ...ReadUseCases,
  ],
  exports: [],
})
export class AuthModule {}

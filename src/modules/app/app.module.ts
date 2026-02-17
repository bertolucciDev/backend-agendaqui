import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { CheckApiHealthController } from './presentation/controller/check-api-health.controller';
import { PrismaHealthRepository } from './infra/repositories/prisma-health.provider';
import { DatabaseHealthRepository } from './domain/repositories/database-health.repository';
import { CacheHealthRepository } from './domain/repositories/cache-health.repository';
import { RedisHealthRepository } from './infra/repositories/redis-health.provider';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
// import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    // PrometheusModule.register({
    //   path: '/metrics',
    // }),
    SharedModule,
    UserModule,
    AuthModule,
  ],
  controllers: [CheckApiHealthController],
  providers: [
    CheckHealthUseCase,
    {
      provide: CacheHealthRepository,
      useClass: RedisHealthRepository,
    },
    {
      provide: DatabaseHealthRepository,
      useClass: PrismaHealthRepository,
    },
  ],
})
export class AppModule {}

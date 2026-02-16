import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { CheckApiHealthController } from './presentation/controller/check-api-health.controller';
import { PrismaHealthRepository } from './infra/repositories/prisma-health.provider';
import { DatabaseHealthRepository } from './domain/repositories/database-health.repository';
import { UserModule } from '../user/user.module';
import { CacheHealthRepository } from './domain/repositories/cache-health.repository';
import { RedisHealthRepository } from './infra/repositories/redis-health.provider';

@Module({
  imports: [
    // PrometheusModule.register({
    //   path: '/metrics',
    // }),
    SharedModule,
    UserModule,
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

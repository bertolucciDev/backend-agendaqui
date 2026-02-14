import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { CheckApiHealthController } from './presentation/controller/check-api-health.controller';
import { PrismaHealthRepository } from './infra/database/prisma-health.provider';
import { DatabaseHealthRepository } from './domain/repositories/database-health.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [CheckApiHealthController],
  providers: [
    CheckHealthUseCase,
    {
      provide: DatabaseHealthRepository,
      useClass: PrismaHealthRepository,
    },
  ],
})
export class AppModule {}

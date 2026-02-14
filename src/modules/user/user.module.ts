import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller/user.controller';
import { GetUserIdUseCase } from './application/use-cases/get-user-id.use-case';
import { UserRepo } from './domain/repositories/user.repo';
import { UserRepository } from './infra/database/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    GetUserIdUseCase,
    {
      provide: UserRepo,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}

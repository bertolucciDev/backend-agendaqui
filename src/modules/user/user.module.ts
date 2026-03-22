import { Module } from '@nestjs/common';

import { AbstractUserReadRepository } from './domain/repositories/user.read-repository';
import { AbstractUserWriteRepository } from '../../modules/user/domain/repositories/user.write-repository';
import { PrismaUserReadRepository } from './infra/repositories/database/prisma-user.read-repository';
import { PrismaUserWriteRepository } from './infra/repositories/database/prisma-user.write-repository';

import { CreateUserUseCase } from '../../modules/user/application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../../modules/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../modules/user/application/use-cases/delete-user.use-case';

import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { CheckEmailUseCase } from './application/use-cases/check-email.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';

import { DeleteUserController } from './presentation/controllers/user/delete-user.controller';
import { UpdateUserController } from './presentation/controllers/user/update-user.controller';
// import { AdminController } from '../../modules/user/presentation/controllers/admin.controller';

const WriteUseCases = [CreateUserUseCase, DeleteUserUseCase, UpdateUserUseCase];

const ReadUseCases = [
  GetUserByIdUseCase,
  GetAllUsersUseCase,
  CheckEmailUseCase,
];

@Module({
  controllers: [DeleteUserController, UpdateUserController],
  providers: [
    {
      provide: AbstractUserWriteRepository,
      useClass: PrismaUserWriteRepository,
    },
    {
      provide: AbstractUserReadRepository,
      useClass: PrismaUserReadRepository,
    },
    ...WriteUseCases,
    ...ReadUseCases,
  ],
})
export class UserModule {}

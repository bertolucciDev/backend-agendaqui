import { ConflictException, Injectable } from '@nestjs/common';
import { AbstractUserWriteRepository } from '../../../../modules/user/domain/repositories/user.write-repository';
import { ResponseAdminDTO } from '../../../../modules/user/presentation/dto/output/response-admin.dto';
import { CreateUserInput } from './implements/create-user.input';
import { Email } from '../../../../core/value-objects/email.vo';
import { User } from '../../../../modules/user/domain/entities/user.entity';
import { Password } from '../../../../core/value-objects/password.vo';
import { Role } from '../../../../core/enum/role.enum';
import { AbstractUserReadRepository } from '../../../../modules/user/domain/repositories/user.read-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(command: CreateUserInput): Promise<ResponseAdminDTO> {
    const email = new Email(command.email);
    const emailExists = await this.userReadRepository.findByEmail(email);
    const password = await Password.create(command.password);

    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    const user = User.create({
      name: command.name,
      email,
      password,
      role: command.role ?? Role.USER,
      isVerified: true,
    });
    await this.userWriteRepository.create(user);

    return new ResponseAdminDTO(user);
  }
}

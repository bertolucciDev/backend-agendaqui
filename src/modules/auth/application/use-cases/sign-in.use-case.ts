import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { ValidateUserCredentialsQuery } from './implements/validate-user-credentials.query';
import { ResponseUserDTO } from '../../../user/presentation/dto/output/response-user.dto';
import { Email } from '../../../../shared/domain/value-objects/email.vo';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(query: ValidateUserCredentialsQuery): Promise<ResponseUserDTO> {
    const email = new Email(query.email);
    const existingUser = await this.userReadRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await existingUser.comparePassword(query.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!existingUser.isUserVerified()) {
      throw new UnauthorizedException('Email not verified');
    }

    return new ResponseUserDTO(existingUser);
  }
}

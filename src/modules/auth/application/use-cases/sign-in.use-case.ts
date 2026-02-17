import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { ResponseUserDTO } from '../../../user/presentation/dto/output/response-user.dto';
import { Email } from '../../../../core/value-objects/email.vo';
import { LoginDTO } from '../../presentation/dto/input/login.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(dto: LoginDTO): Promise<ResponseUserDTO> {
    const email = new Email(dto.email);
    const existingUser = await this.userReadRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await existingUser.comparePassword(dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!existingUser.isUserVerified()) {
      throw new UnauthorizedException('Email not verified');
    }

    return new ResponseUserDTO(existingUser);
  }
}

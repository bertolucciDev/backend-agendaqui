import { Injectable } from '@nestjs/common';
import { AbstractUserReadRepository } from '../../../../modules/user/domain/repositories/user.read-repository';
import { Email } from '../../../../core/value-objects/email.vo';

@Injectable()
export class CheckEmailUseCase {
  constructor(
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(email: Email): Promise<boolean> {
    const existingUser = await this.userReadRepository.findByEmail(email);
    return !!existingUser;
  }
}

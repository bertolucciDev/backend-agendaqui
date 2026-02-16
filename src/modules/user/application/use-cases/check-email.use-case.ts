import { Injectable } from '@nestjs/common';
import { AbstractUserReadRepository } from '@/modules/user/domain/repositories/user.read-repository';
import { CheckEmailInput } from './implements/check-email.input';

@Injectable()
export class CheckEmailUseCase {
  constructor(
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(query: CheckEmailInput): Promise<boolean> {
    const existingUser = await this.userReadRepository.findByEmail(query.email);
    return !!existingUser;
  }
}

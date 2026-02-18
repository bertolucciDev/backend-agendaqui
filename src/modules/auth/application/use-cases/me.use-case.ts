import { UserResponseDTO } from '../../../../modules/user/presentation/dto/output/user-response.dto';
import { AbstractUserReadRepository } from '../../../../modules/user/domain/repositories/user.read-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeUseCase {
  constructor(
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userReadRepository.findById(id);
    if (!user) {
      throw new Error();
    }

    return new UserResponseDTO(user);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepo } from '../../domain/repositories/user.repo';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserIdUseCase {
  constructor(private readonly userRepo: UserRepo) {}

  async execute(id: string): Promise<User | null> {
    const userId = await this.userRepo.findById(id);
    if (!userId) {
      throw new NotFoundException();
    }

    return userId;
  }
}

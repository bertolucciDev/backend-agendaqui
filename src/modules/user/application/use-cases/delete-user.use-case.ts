import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractUserWriteRepository } from '../../../../modules/user/domain/repositories/user.write-repository';
import { AbstractUserReadRepository } from '../../../../modules/user/domain/repositories/user.read-repository';
import { DeleteUserInput } from './implements/delete-user.input';
import { Role } from '../../../../core/enum/role.enum';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(command: DeleteUserInput): Promise<void> {
    const requester = await this.userReadRepository.findById(
      command.requesterId,
    );
    if (!requester) {
      throw new NotFoundException('Requester not found');
    }

    const targetUser = await this.userReadRepository.findById(
      command.targetUserId,
    );
    if (!targetUser) {
      throw new NotFoundException('Target user not found');
    }

    if (command.requesterRole === Role.CLIENT) {
      if (command.targetUserId !== command.requesterId) {
        throw new BadRequestException('Cannot delete other user');
      }

      if (!command.currentPassword) {
        throw new Error('Password is required to delete your own account');
      }

      const isPasswordValid = await requester.comparePassword(
        command.currentPassword,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
    }

    if (!targetUser.isDeletable()) {
      throw new BadRequestException('Cannot delete admin');
    }

    await this.userWriteRepository.delete(command.targetUserId);
  }
}

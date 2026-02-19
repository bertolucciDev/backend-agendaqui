import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractUserWriteRepository } from '../../../../modules/user/domain/repositories/user.write-repository';
import { AbstractUserReadRepository } from '../../../../modules/user/domain/repositories/user.read-repository';
import { UpdateUserInput } from './implements/update-user.input';
import { UpdateUserDTO } from '../../presentation/dto/input/update-user.dto';
import { Email } from '../../../../core/value-objects/email.vo';
import { Password } from '../../../../core/value-objects/password.vo';
import { Role } from '../../../../core/enum/role.enum';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(command: UpdateUserInput): Promise<void> {
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

    if (
      command.requesterRole === Role.CLIENT &&
      command.targetUserId !== command.requesterId
    ) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const updateData: Partial<UpdateUserDTO> = { ...command.updateData };

    if (command.requesterRole === Role.CLIENT) {
      delete updateData.role;
    }
    if (command.requesterRole === Role.ADMIN) {
      delete updateData.currentPassword;
    }

    if (updateData.newName) targetUser.setName(updateData.newName);
    if (updateData.newEmail)
      targetUser.setEmail(new Email(updateData.newEmail));
    if (updateData.newPassword) {
      if (command.requesterRole === Role.CLIENT) {
        if (!command.currentPassword) {
          throw new Error('Password is required to update password');
        }

        const isPasswordValid = await requester.comparePassword(
          command.currentPassword,
        );
        if (!isPasswordValid) {
          throw new ForbiddenException('Invalid password');
        }

        if (updateData.newPassword !== updateData.confirmNewPassword) {
          throw new BadRequestException(
            'New password confirmation does not match',
          );
        }
      }
      const newPassword = await Password.create(updateData.newPassword);
      targetUser.setPassword(newPassword);
    }
    if (updateData.role) targetUser.setRole(updateData.role);

    await this.userWriteRepository.update(targetUser);
  }
}

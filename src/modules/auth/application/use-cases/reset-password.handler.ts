import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { AbstractUserWriteRepository } from '../../../user/domain/repositories/user.write-repository';

import { Password } from '../../../../shared/domain/value-objects/password.vo';
import { ResetPasswordCommand } from './implements/reset-password.command';
import { VerifyRecoveryUseCase } from './verify-recovery.handler';
import { VerificationType } from '../../../../shared/types/verification-type.type';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
    private readonly verificationRepository: AbstractVerificationRepository,
    private readonly verifyRecovery: VerifyRecoveryUseCase,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const { password, data } = command;
    const record = await this.verifyRecovery.execute({
      type: VerificationType.RESET_PASSWORD,
      token: data.token,
      code: data.code,
    });

    const user = await this.userReadRepository.findById(record.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPassword = await Password.create(password);
    user.setPassword(newPassword);

    await this.userWriteRepository.update(user);
    await this.verificationRepository.markAsUsed(record.id);
  }
}

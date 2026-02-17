import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';
import { AbstractUserWriteRepository } from '../../../user/domain/repositories/user.write-repository';
import { VerifyRecoveryUseCase } from './verify-recovery.use-case';
import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { VerifyEmailCommand } from './implements/verify-email.command';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    private readonly verificationRepository: AbstractVerificationRepository,
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly verifyRecovery: VerifyRecoveryUseCase,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<void> {
    const { data } = command;
    const record = await this.verifyRecovery.execute({
      type: VerificationType.VERIFY_EMAIL,
      token: data.token,
      code: data.code,
    });

    if (record.type !== VerificationType.VERIFY_EMAIL) {
      throw new HttpException(
        'Invalid verification type for this handler',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userWriteRepository.updateIsVerified(record.userId);
    await this.verificationRepository.markAsUsed(record.id);
  }
}

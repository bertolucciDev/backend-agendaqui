import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';
import { AbstractUserWriteRepository } from '../../../user/domain/repositories/user.write-repository';
import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { VerifyEmailDTO } from '../../presentation/dto/input/verify-email';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    private readonly verificationRepository: AbstractVerificationRepository,
    private readonly userWriteRepository: AbstractUserWriteRepository,
  ) {}

  async execute(dto: VerifyEmailDTO): Promise<void> {
    const { code, token } = dto;

    if (!token && !code) {
      throw new HttpException(
        'Token or code is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const record = token
      ? await this.verificationRepository.findByToken(token)
      : await this.verificationRepository.findByCode(code!);

    if (!record) {
      throw new HttpException(
        'Invalid or expired verification record',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (record.expiresAt.getTime() < Date.now()) {
      throw new HttpException('Verification expired', HttpStatus.GONE);
    }

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

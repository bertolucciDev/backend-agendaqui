import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { AbstractUserWriteRepository } from '../../../user/domain/repositories/user.write-repository';

import { Password } from '../../../../core/value-objects/password.vo';
import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { PasswordResetDTO } from '../../presentation/dto/input/password-reset.dto';

@Injectable()
export class PasswordResetUseCase {
  constructor(
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
    private readonly verificationRepository: AbstractVerificationRepository,
  ) {}

  async execute(dto: PasswordResetDTO): Promise<void> {
    const { password, token, code } = dto;

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

    if (record.isUsed) {
      const message =
        record.type === VerificationType.PASSWORD_RESET
          ? 'Reset link or code already used'
          : 'Email already verified';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    if (record.expiresAt.getTime() < Date.now()) {
      throw new HttpException('Verification expired', HttpStatus.GONE);
    }

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

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';

import { GenerateVerificationCode } from '../../../../shared/utils/generate-verification-code.util';
import { Email } from '../../../../core/value-objects/email.vo';
import { Token } from '../../../../core/value-objects/token.vo';
import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { AbstractEmailService } from '../../../../core/services/email.service';
import { env } from '../../../../config/env';
import { ResetPasswordTemplate } from '../../../../shared/infra/mail/templates/reset-password.template';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    private readonly emailService: AbstractEmailService,
    private readonly userReadRepository: AbstractUserReadRepository,
    private readonly verificationRepository: AbstractVerificationRepository,
  ) {}

  async execute(emailInput: string): Promise<void> {
    const email = new Email(emailInput);
    const existingUser = await this.userReadRepository.findByEmail(email);
    if (!existingUser) {
      return;
    }

    const rawToken = randomUUID();
    const verificationToken = new Token(rawToken);
    const verificationCode = GenerateVerificationCode(6);
    const verificationType = VerificationType.PASSWORD_RESET;

    await this.verificationRepository.create({
      userId: existingUser.getId(),
      token: verificationToken.toString(),
      code: verificationCode,
      type: verificationType,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h,
      isUsed: false,
    });

    const redirect_url = `${env.FRONT_URL}/step1`;

    const { subject, html } = ResetPasswordTemplate({
      redirect_url,
      code: verificationCode,
      token: verificationToken.getValue(),
      name: existingUser.getName(),
      type: VerificationType.PASSWORD_RESET,
    });

    await this.emailService.sendEmail({
      to: [existingUser.getEmailValue()],
      subject,
      html,
    });
  }
}

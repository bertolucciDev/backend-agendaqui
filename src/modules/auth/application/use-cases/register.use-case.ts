import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { User } from '../../../user/domain/entities/user.entity';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { AbstractUserWriteRepository } from '../../../user/domain/repositories/user.write-repository';
import { AbstractVerificationRepository } from '../../domain/repositories/verify.repository';

import { RegisterDTO } from '../../presentation/dto/input/register.dto';

import { GenerateVerificationCode } from '../../../../shared/utils/generate-verification-code.util';
import { Email } from '../../../../core/value-objects/email.vo';
import { Password } from '../../../../core/value-objects/password.vo';
import { Token } from '../../../../core/value-objects/token.vo';
import { Role } from '../../../../core/enum/role.enum';
import { VerificationType } from '../../../../core/enum/verification-type.enum';
import { verifyEmailTemplate } from '../../../../shared/infra/mail/templates/email-verification.template';
import { AbstractEmailService } from '../../../../core/services/email.service';
import { env } from '../../../../config/env';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly emailService: AbstractEmailService,
    private readonly userWriteRepository: AbstractUserWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
    private readonly verificationTokenRepository: AbstractVerificationRepository,
  ) {}

  async execute(dto: RegisterDTO): Promise<string> {
    const email = new Email(dto.email);
    const password = await Password.create(dto.password);

    const existingUser = await this.userReadRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = User.create({
      name: dto.name,
      email,
      password,
      role: Role.CLIENT,
      isVerified: false,
    });
    await this.userWriteRepository.create(user);

    const verificationToken = new Token(randomUUID());
    const verificationCode = GenerateVerificationCode(6);
    const verificationType = VerificationType.VERIFY_EMAIL;

    await this.verificationTokenRepository.create({
      userId: user.getId(),
      token: verificationToken.toString(),
      code: verificationCode,
      type: verificationType,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
      isUsed: false,
    });

    const redirect_url = `${env.FRONT_URL}/verify-email`;

    const { subject, html } = verifyEmailTemplate({
      redirect_url,
      code: verificationCode,
      token: verificationToken.getValue(),
      name: user.getName(),
      type: VerificationType.VERIFY_EMAIL,
    });

    await this.emailService.sendEmail({
      to: [user.getEmailValue()],
      subject,
      html,
    });

    return 'Registration successful';
  }
}

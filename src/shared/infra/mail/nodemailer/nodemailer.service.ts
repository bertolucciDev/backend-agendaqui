import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { AbstractEmailService } from '../../../../core/services/email.service';
import { SendEmailInput } from '../../../../core/services/email.service';

@Injectable()
export class NodemailerEmailService implements AbstractEmailService {
  private readonly logger = new Logger(NodemailerEmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: Number(this.configService.get<string>('EMAIL_PORT')),
      secure: true, // 587 - false | 465 true
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(input: SendEmailInput): Promise<void> {
    const { to, subject, html, text } = input;

    if (!to || to.length === 0) {
      throw new BadRequestException('No recipients defined');
    }

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: to.join(', '),
      subject,
      html,
      text: text ?? '',
    };

    try {
      await this.transporter.sendMail(options);
      this.logger.log(`Email sent successfully to: ${to.join(', ')}`);
    } catch (error) {
      this.logger.error(
        'Error sending mail: ',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}

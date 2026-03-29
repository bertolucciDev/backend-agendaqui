import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerEmailService } from './nodemailer/nodemailer.service';
import { FakeEmailService } from './nodemailer/fake-email.service';
import { AbstractEmailService } from '../../../core/services/email.service';

const logger = new Logger('EmailModule');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: AbstractEmailService,
      useFactory: (configService: ConfigService) => {
        const emailFake = configService.get<string>('EMAIL_FAKE') !== 'false';
        const hasEmailCredentials =
          !!configService.get<string>('EMAIL_USER') &&
          !!configService.get<string>('EMAIL_PASSWORD');

        if (emailFake || !hasEmailCredentials) {
          if (!emailFake && !hasEmailCredentials) {
            logger.warn(
              'EMAIL_USER/EMAIL_PASSWORD are missing. Falling back to fake email service (degraded mode).',
            );
          }
          return new FakeEmailService();
        }

        return new NodemailerEmailService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AbstractEmailService],
})
export class EmailModule {}

import { Logger, Module } from '@nestjs/common';
import { NodemailerEmailService } from './nodemailer/nodemailer.service';
import { FakeEmailService } from './nodemailer/fake-email.service';
import { AbstractEmailService } from '../../../core/services/email.service';
import { env } from '../../../config/env';

const logger = new Logger('EmailModule');

@Module({
  providers: [
    {
      provide: AbstractEmailService,
      useFactory: () => {
        const emailEnabled = env.ENABLE_EMAIL;
        const emailFake = env.EMAIL_FAKE;
        const hasEmailCredentials = !!env.EMAIL_USER && !!env.EMAIL_PASSWORD;

        if (!emailEnabled) {
          logger.warn(
            'ENABLE_EMAIL=false. Using fake email service (feature disabled).',
          );
          return new FakeEmailService();
        }

        if (emailFake || !hasEmailCredentials) {
          if (!emailFake && !hasEmailCredentials)
            logger.warn(
              'EMAIL_USER/EMAIL_PASSWORD are missing. Falling back to fake email service (degraded mode).',
            );
          return new FakeEmailService();
        }

        return new NodemailerEmailService();
      },
    },
  ],
  exports: [AbstractEmailService],
})
export class EmailModule {}

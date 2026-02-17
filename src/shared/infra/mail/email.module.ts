import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerEmailService } from './nodemailer/nodemailer.service';
import { FakeEmailService } from './nodemailer/fake-email.service';
import { AbstractEmailService } from '../../../core/services/email.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: AbstractEmailService,
      useFactory: (configService: ConfigService) => {
        const emailFake = configService.get<string>('EMAIL_FAKE') === 'true';
        return emailFake
          ? new FakeEmailService()
          : new NodemailerEmailService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AbstractEmailService],
})
export class EmailModule {}

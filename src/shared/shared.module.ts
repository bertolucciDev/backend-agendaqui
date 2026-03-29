import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { CacheModule } from './infra/cache/cache.module';
import { EmailModule } from './infra/mail/email.module';
import { env } from '../config/env';

const optionalInfraModules: Array<typeof CacheModule | typeof EmailModule> = [];

if (env.ENABLE_CACHE) {
  optionalInfraModules.push(CacheModule);
}

if (env.ENABLE_EMAIL) {
  optionalInfraModules.push(EmailModule);
}

@Global()
@Module({
  imports: [DatabaseModule, ...optionalInfraModules],
  exports: [DatabaseModule, ...optionalInfraModules],
})
export class SharedModule {}

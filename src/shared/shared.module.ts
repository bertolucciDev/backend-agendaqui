import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { CacheModule } from './infra/cache/cache.module';
import { EmailModule } from './infra/mail/email.module';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule, EmailModule],
  exports: [DatabaseModule, CacheModule, EmailModule],
})
export class SharedModule {}

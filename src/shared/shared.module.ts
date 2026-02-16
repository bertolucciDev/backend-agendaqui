import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { CacheModule } from './infra/cache/cache.module';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule],
  exports: [DatabaseModule, CacheModule],
})
export class SharedModule {}

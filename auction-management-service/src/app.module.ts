import { Module } from '@nestjs/common';
import { AppConfigModule } from './configuration/app/config.module';
import { MariadbDatabaseProviderModule } from './providers/database/mariadb/provider.module';
import { FeaturesModule } from './module/index.module';

@Module({
  imports: [
    AppConfigModule,
    MariadbDatabaseProviderModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

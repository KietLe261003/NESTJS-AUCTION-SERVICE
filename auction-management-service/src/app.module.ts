import { Module } from '@nestjs/common';
import { AppConfigModule } from './configuration/app/config.module';
import { MariadbDatabaseProviderModule } from './providers/database/mariadb/provider.module';
import { ModelModule } from './models/index.module';

@Module({
  imports: [
    AppConfigModule,
    MariadbDatabaseProviderModule,
    ModelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

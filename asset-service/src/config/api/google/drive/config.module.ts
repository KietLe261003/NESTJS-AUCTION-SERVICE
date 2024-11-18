
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { GoogleDriveConfigService } from './config.service';

/**
 * Module for Google Drive configuration.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, GoogleDriveConfigService],
  exports: [GoogleDriveConfigService],
})
export class GoogleDriveConfigModule { }

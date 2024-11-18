import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import * as Joi from 'joi'
import { MariadbConfigService } from "./config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MARIADB_DB_HOST: Joi.string().required(),
        MARIADB_DB_PORT: Joi.string().default(3306),
        MARIADB_DB_USERNAME: Joi.string().required(),
        MARIADB_DB_PASSWORD: Joi.string().required(),
        MARIADB_DB_NAME: Joi.string().required()
      })
    })
  ],

  providers: [MariadbConfigService, ConfigService],
  exports: [MariadbConfigService, ConfigService]
})

export class MariadbConfigModule { }

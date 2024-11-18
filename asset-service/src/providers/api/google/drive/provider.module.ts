import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleDriveModule } from "nestjs-google-drive";
import { GoogleDriveConfigService } from "src/config/api/google/drive/config.service";

@Module({
  imports: [
    GoogleDriveModule.register({
      clientId: new GoogleDriveConfigService(new ConfigService()).clientId,
      clientSecret: new GoogleDriveConfigService(new ConfigService()).clientSecret,
      refreshToken: new GoogleDriveConfigService(new ConfigService()).refreshToken,
      redirectUrl: new GoogleDriveConfigService(new ConfigService()).redirectUrl
    })
  ],
})

export class GoogleDriveProviderModule { }


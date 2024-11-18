import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Service dealing with Google Drive configuration operations.
 *
 * @class
 */
@Injectable()
export class GoogleDriveConfigService {
  constructor(private configService: ConfigService) { }

  get clientId(): string {
    return this.configService.get<string>('googleDrive.clientId')
  }

  get redirectUrl(): string {
    return this.configService.get<string>('googleDrive.redirectUrl')
  }

  get clientSecret(): string {
    return this.configService.get<string>('googleDrive.clientSecret')
  }

  get refreshToken(): string {
    return this.configService.get<string>('googleDrive.refreshToken')
  }
}


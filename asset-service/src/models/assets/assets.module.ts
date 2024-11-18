import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetStatusesModule } from '../asset-statuses/asset-statuses.module';
import { AssetTypesModule } from '../asset-types/asset-types.module';
import { GoogleDriveProviderModule } from 'src/providers/api/google/drive/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset]),
    AssetStatusesModule,
    AssetTypesModule,
    GoogleDriveProviderModule
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService]
})
export class AssetsModule { }

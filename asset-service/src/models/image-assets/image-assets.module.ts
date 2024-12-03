import { Module } from '@nestjs/common';
import { ImageAssetsService } from './image-assets.service';
import { ImageAssetsController } from './image-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageAsset } from './entities/image-asset.entity';
import { FileModule } from 'src/services/file/file.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageAsset]),
    FileModule,
    AssetsModule
  ],
  controllers: [ImageAssetsController],
  providers: [ImageAssetsService],
})
export class ImageAssetsModule { }

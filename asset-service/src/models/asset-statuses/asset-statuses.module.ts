import { Module } from '@nestjs/common';
import { AssetStatusesService } from './asset-statuses.service';
import { AssetStatusesController } from './asset-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetStatus } from './entities/asset-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetStatus])],
  controllers: [AssetStatusesController],
  providers: [AssetStatusesService],
  exports: [AssetStatusesService]
})
export class AssetStatusesModule { }

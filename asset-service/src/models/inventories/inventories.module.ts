import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { Inventory } from './entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    WarehouseModule,
    AssetsModule
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule { }

import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { MariadbDatabaseProviderModule } from './providers/database/mariadb/provider.module';
import { AssetTypesModule } from './models/asset-types/asset-types.module';
import { AssetStatusesModule } from './models/asset-statuses/asset-statuses.module';
import { WarehouseModule } from './models/warehouse/warehouse.module';
import { InventoriesModule } from './models/inventories/inventories.module';
import { AssetsModule } from './models/assets/assets.module';

@Module({
  imports: [
    AppConfigModule,
    MariadbDatabaseProviderModule,
    AssetTypesModule,
    AssetStatusesModule,
    WarehouseModule,
    InventoriesModule,
    AssetsModule
  ],
})

export class AppModule { }

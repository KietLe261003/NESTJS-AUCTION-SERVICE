import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse/warehouse.service';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory) private readonly inventoriesRepository: Repository<Inventory>,
    private readonly wareHouseService: WarehouseService,
    private readonly assetService: AssetsService
  ) { }

  async create(createInventoryDto: CreateInventoryDto) {
    const asset = await this.assetService.findOne(createInventoryDto.assetID)
    if (!asset) throw new NotFoundException(`Asset with ID: ${createInventoryDto.assetID} not found`)

    const warehouse = await this.wareHouseService.findOne(createInventoryDto.warehouseID);
    if (!warehouse) throw new NotFoundException(`Warehouse with ID: ${createInventoryDto.warehouseID} not found`)


    const created = this.inventoriesRepository.create(createInventoryDto);
    const savedInventory = await this.inventoriesRepository.save(created);

    return {
      code: 201,
      message: 'Inventory created successfully',
      metadata: savedInventory,
    }
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}, order: any = {}): Promise<{ code: number; message: string; metadata: any }> {
    const [result, total] = await this.inventoriesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
      order: order,
    });

    return {
      code: 200,
      message: 'Inventories retrieved successfully',
      metadata: {
        data: result,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{ code: number; message: string; metadata: Inventory }> {
    const asset = await this.inventoriesRepository.findOne({ where: { inventoryID: id } });

    if (!asset) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Inventory retrieved successfully',
      metadata: asset,
    };
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<{ code: number; message: string; metadata: Inventory }> {
    const result = await this.inventoriesRepository.update({ inventoryID: id }, updateInventoryDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const updatedAssetType = await this.inventoriesRepository.findOne({ where: { inventoryID: id } });

    return {
      code: 200,
      message: 'Inventory updated successfully',
      metadata: updatedAssetType,
    };
  }

  async remove(id: number): Promise<{ code: number; message: string; metadata: null }> {
    const result = await this.inventoriesRepository.delete({ inventoryID: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Inventory deleted successfully',
      metadata: null,
    };
  }
}

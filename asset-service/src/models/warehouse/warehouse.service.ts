import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(@InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>) { }
  async create(createWarehouseDto: CreateWarehouseDto) {
    const created = this.warehouseRepository.create(createWarehouseDto);
    const savedWarehose = await this.warehouseRepository.save(created);
    return {
      code: 201,
      message: 'Warehouse created successfully',
      metadata: savedWarehose,
    };
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}, order: any = {}): Promise<{ code: number; message: string; metadata: any }> {
    const [result, total] = await this.warehouseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
      order: order,
    });

    return {
      code: 200,
      message: 'Warehouse retrieved successfully',
      metadata: {
        data: result,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{ code: number; message: string; metadata: Warehouse }> {
    const warehouse = await this.warehouseRepository.findOne({ where: { warehouseID: id } });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Warehouse retrieved successfully',
      metadata: warehouse,
    };
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<{ code: number; message: string; metadata: Warehouse }> {
    const result = await this.warehouseRepository.update({ warehouseID: id }, updateWarehouseDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    const updatedWarehouse = await this.warehouseRepository.findOne({ where: { warehouseID: id } });

    return {
      code: 200,
      message: 'Warehouse updated successfully',
      metadata: updatedWarehouse,
    };
  }

  async remove(id: number): Promise<{ code: number; message: string; metadata: null }> {
    const result = await this.warehouseRepository.delete({ warehouseID: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Warehouse deleted successfully',
      metadata: null,
    };
  }
}

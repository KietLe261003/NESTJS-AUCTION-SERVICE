
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetStatusDto } from './dto/create-asset-status.dto';
import { UpdateAssetStatusDto } from './dto/update-asset-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetStatus } from './entities/asset-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetStatusesService {
  constructor(@InjectRepository(AssetStatus) private readonly assetStatusRepository: Repository<AssetStatus>) { }

  async create(createAssetStatusDto: CreateAssetStatusDto): Promise<{ code: number; message: string; metadata: AssetStatus }> {
    const created = this.assetStatusRepository.create(createAssetStatusDto);
    const savedAssetStatus = await this.assetStatusRepository.save(created);
    return {
      code: 201,
      message: 'Asset status created successfully',
      metadata: savedAssetStatus,
    };
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}, order: any = {}): Promise<{ code: number; message: string; metadata: any }> {
    const [result, total] = await this.assetStatusRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
      order: order,
    });

    return {
      code: 200,
      message: 'Asset statuses retrieved successfully',
      metadata: {
        result,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{ code: number; message: string; metadata: AssetStatus }> {
    const assetStatus = await this.assetStatusRepository.findOne({ where: { assetStatusID: id } });

    if (!assetStatus) {
      throw new NotFoundException(`AssetStatus with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Asset status retrieved successfully',
      metadata: assetStatus,
    };
  }

  async update(id: number, updateAssetStatusDto: UpdateAssetStatusDto): Promise<{ code: number; message: string; metadata: AssetStatus }> {
    const result = await this.assetStatusRepository.update({ assetStatusID: id }, updateAssetStatusDto);

    if (result.affected === 0) {
      throw new NotFoundException(`AssetStatus with ID ${id} not found`);
    }

    const updatedAssetStatus = await this.assetStatusRepository.findOne({ where: { assetStatusID: id } });

    return {
      code: 200,
      message: 'Asset status updated successfully',
      metadata: updatedAssetStatus,
    };
  }

  async remove(id: number): Promise<{ code: number; message: string; metadata: null }> {
    const result = await this.assetStatusRepository.delete({ assetStatusID: id });

    if (result.affected === 0) {
      throw new NotFoundException(`AssetStatus with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Asset status deleted successfully',
      metadata: null,
    };
  }
}


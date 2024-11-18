
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetType } from './entities/asset-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetTypesService {
  constructor(@InjectRepository(AssetType) private readonly assetTypesRepository: Repository<AssetType>) { }

  async create(createAssetTypeDto: CreateAssetTypeDto): Promise<{ code: number; message: string; metadata: AssetType }> {
    const created = this.assetTypesRepository.create(createAssetTypeDto);
    const savedAssetType = await this.assetTypesRepository.save(created);
    return {
      code: 201,
      message: 'Asset Type created successfully',
      metadata: savedAssetType,
    };
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}, order: any = {}): Promise<{ code: number; message: string; metadata: any }> {
    const [result, total] = await this.assetTypesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
      order: order,
    });

    return {
      code: 200,
      message: 'Asset Types retrieved successfully',
      metadata: {
        data: result,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{ code: number; message: string; metadata: AssetType }> {
    const assetType = await this.assetTypesRepository.findOne({ where: { assetTypeID: id } });

    if (!assetType) {
      throw new NotFoundException(`AssetType with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Asset Type retrieved successfully',
      metadata: assetType,
    };
  }

  async update(id: number, updateAssetTypeDto: UpdateAssetTypeDto): Promise<{ code: number; message: string; metadata: AssetType }> {
    const result = await this.assetTypesRepository.update({ assetTypeID: id }, updateAssetTypeDto);

    if (result.affected === 0) {
      throw new NotFoundException(`AssetType with ID ${id} not found`);
    }

    const updatedAssetType = await this.assetTypesRepository.findOne({ where: { assetTypeID: id } });

    return {
      code: 200,
      message: 'Asset Type updated successfully',
      metadata: updatedAssetType,
    };
  }

  async remove(id: number): Promise<{ code: number; message: string; metadata: null }> {
    const result = await this.assetTypesRepository.delete({ assetTypeID: id });

    if (result.affected === 0) {
      throw new NotFoundException(`AssetType with ID ${id} not found`);
    }

    return {
      code: 200,
      message: 'Asset Type deleted successfully',
      metadata: null,
    };
  }
}


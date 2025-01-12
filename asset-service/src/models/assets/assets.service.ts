import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { AssetStatusesService } from '../asset-statuses/asset-statuses.service';
import { AssetTypesService } from '../asset-types/asset-types.service';
import { FileService } from 'src/services/file/file.service';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class AssetsService {

  constructor(
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    private readonly assetStatusService: AssetStatusesService,
    private readonly assetTypesService: AssetTypesService,
    private readonly fileService: FileService
  ) { }

  async create(createAssetDto: CreateAssetDto, file: Express.Multer.File) {
    console.log(file)
    try {
      if (!file || !file.buffer) {
        throw new Error('Invalid file buffer');
      }

      const filename = await this.fileService.uploadFile(file)
      createAssetDto.mainImage = filename

      const assetType = await this.assetTypesService.findOne(createAssetDto.assetTypeID);
      if (!assetType) throw new NotFoundException('Asset type not found');

      const assetStatus = await this.assetStatusService.findOne(createAssetDto.assetStatusID);
      if (!assetStatus) throw new NotFoundException('Asset status not found');

      const created = this.assetRepository.create(createAssetDto);
      const savedAsset = await this.assetRepository.save(created);

      savedAsset.mainImage = `${process.env.APP_SERVICE_URL}/uploads/${filename}`

      return {
        code: 201,
        message: 'Asset created successfully',
        metadata: savedAsset,
      };
    } catch (error) {
      console.error('Error creating asset:', error.message);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}, order: any = {}): Promise<{ code: number; message: string; metadata: any }> {
    const [result, total] = await this.assetRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
      order: order,
    });

    for (let i = 0; i < result.length; i++) {
      result[i].mainImage = `${process.env.APP_SERVICE_URL}/uploads/${result[i].mainImage}`
    }

    return {
      code: 200,
      message: 'Asset retrieved successfully',
      metadata: {
        data: result,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{ code: number; message: string; metadata: Asset }> {
    const asset = await this.assetRepository.findOne({ where: { assetID: id } });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    asset.mainImage = `${process.env.APP_SERVICE_URL}/uploads/${asset.mainImage}`
    return {
      code: 200,
      message: 'Asset retrieved successfully',
      metadata: asset,
    };
  }

  async update(id: number, updateAssetDto: UpdateAssetDto, file: Express.Multer.File): Promise<{ code: number; message: string; metadata: Asset }> {
    if (file) {
      await this.fileService.deleteFile(updateAssetDto.mainImage)
      const filename = await this.fileService.uploadFile(file)
      updateAssetDto.mainImage = filename
    }
    const result = await this.assetRepository.update({ assetTypeID: id }, updateAssetDto);

    if (result.affected === 0) {
      throw new NotFoundException(`AssetType with ID ${id} not found`);
    }

    const updatedAssetType = await this.assetRepository.findOne({ where: { assetTypeID: id } });

    return {
      code: 200,
      message: 'Asset Type updated successfully',
      metadata: updatedAssetType,
    };
  }

  async remove(id: number): Promise<{ code: number; message: string; metadata: null }> {
    const result = await this.assetRepository.delete({ assetTypeID: id });

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

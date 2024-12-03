import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageAssetDto } from './dto/create-image-asset.dto';
import { UpdateImageAssetDto } from './dto/update-image-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageAsset } from './entities/image-asset.entity';
import { Repository } from 'typeorm';
import { FileService } from 'src/services/file/file.service';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class ImageAssetsService {
  constructor(
    @InjectRepository(ImageAsset) private readonly repository: Repository<ImageAsset>,
    private readonly fileService: FileService,
    private readonly assetService: AssetsService
  ) { }
  async create(createImageAssetDto: CreateImageAssetDto, file: Express.Multer.File) {
    try {
      if (!file || !file.buffer) {
        throw new Error('Invalid file buffer');
      }

      const filename = await this.fileService.uploadFile(file)
      createImageAssetDto.imageAsset = filename

      const asset = await this.assetService.findOne(createImageAssetDto.assetID)
      if (!asset) throw new NotFoundException(`Asset with ${createImageAssetDto.assetID} not found`)

      const created = this.repository.create(createImageAssetDto)
      const saved = await this.repository.save(created)
      return {
        code: 201,
        message: 'Asset created successfully',
        metadata: saved,
      };
    } catch (error) {
      console.error('Error creating asset:', error.message);
      throw error;
    }
  }

  findAll() {
    return `This action returns all imageAssets`;
  }

  async findOne(id: number) {
    const imageAsset = await this.repository.findOne({ where: { imageID: id } })
    if (!imageAsset)
      throw new NotFoundException(`Image asset with ID ${id} not found`);

    imageAsset.imageAsset = `uploads/${imageAsset.imageAsset}`
    return {
      code: 200,
      message: 'Image asset retrieved successfully',
      metadata: imageAsset
    }
  }

  update(id: number, updateImageAssetDto: UpdateImageAssetDto) {
    return `This action updates a #${id} imageAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageAsset`;
  }
}

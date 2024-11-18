
import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetStatusesService } from '../asset-statuses/asset-statuses.service';
import { AssetTypesService } from '../asset-types/asset-types.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

describe('AssetsService', () => {
  let service: AssetsService;
  let assetRepository: Repository<Asset>;

  const mockAssetRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAssetStatusesService = {
    findOne: jest.fn(),
  };

  const mockAssetTypesService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        { provide: getRepositoryToken(Asset), useValue: mockAssetRepository },
        { provide: AssetStatusesService, useValue: mockAssetStatusesService },
        { provide: AssetTypesService, useValue: mockAssetTypesService },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
    assetRepository = module.get<Repository<Asset>>(getRepositoryToken(Asset));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new asset successfully', async () => {
      const createAssetDto: CreateAssetDto = {
        assetName: 'Asset 1',
        mainImage: 'image.png',
        assetDescription: 'Description 1',
        assetPrice: 1000,
        inspectorID: 1,
        assetTypeID: 1,
        assetStatusID: 1,
      };

      mockAssetTypesService.findOne.mockResolvedValue({ id: 1 });
      mockAssetStatusesService.findOne.mockResolvedValue({ id: 1 });
      mockAssetRepository.create.mockReturnValue(createAssetDto);
      mockAssetRepository.save.mockResolvedValue(createAssetDto);

      const result = await service.create(createAssetDto);
      expect(result).toEqual({
        code: 201,
        message: 'Asset created successfully',
        metadata: createAssetDto,
      });
    });

    it('should throw NotFoundException if asset type does not exist', async () => {
      const createAssetDto: CreateAssetDto = {
        assetName: 'Asset 1',
        mainImage: 'image.png',
        assetDescription: 'Description 1',
        assetPrice: 1000,
        inspectorID: 1,
        assetTypeID: 99,
        assetStatusID: 1,
      };

      mockAssetTypesService.findOne.mockResolvedValue(null);

      await expect(service.create(createAssetDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of assets', async () => {
      const assets = [{ assetName: 'Asset 1' }, { assetName: 'Asset 2' }];
      mockAssetRepository.findAndCount.mockResolvedValue([assets, assets.length]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        code: 200,
        message: 'Asset retrieved successfully',
        metadata: {
          data: assets,
          total: assets.length,
          page: 1,
          lastPage: 1,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single asset', async () => {
      const asset = { assetName: 'Asset 1', assetTypeID: 1 };
      mockAssetRepository.findOne.mockResolvedValue(asset);

      const result = await service.findOne(1);
      expect(result).toEqual({
        code: 200,
        message: 'Asset retrieved successfully',
        metadata: asset,
      });
    });

    it('should throw NotFoundException if asset is not found', async () => {
      mockAssetRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should update an existing asset', async () => {
  //     const updateAssetDto: UpdateAssetDto = { assetName: 'Updated Asset' };
  //     mockAssetRepository.update.mockResolvedValue({ affected: 1 });
  //     mockAssetRepository.findOne.mockResolvedValue(updateAssetDto);
  //
  //     const result = await service.update(1, updateAssetDto);
  //     expect(result).toEqual({
  //       code: 200,
  //       message: 'Asset Type updated successfully',
  //       metadata: updateAssetDto,
  //     });
  //   });
  //
  //   it('should throw NotFoundException if asset to update is not found', async () => {
  //     mockAssetRepository.update.mockResolvedValue({ affected: 0 });
  //     await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
  //   });
  // });
  //
  describe('remove', () => {
    it('should delete an asset', async () => {
      mockAssetRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({
        code: 200,
        message: 'Asset Type deleted successfully',
        metadata: null,
      });
    });

    it('should throw NotFoundException if asset to delete is not found', async () => {
      mockAssetRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});


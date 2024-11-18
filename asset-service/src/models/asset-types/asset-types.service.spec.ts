
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AssetTypesService } from './asset-types.service';
import { AssetType } from './entities/asset-type.entity';
import { Repository } from 'typeorm';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

describe('AssetTypesService', () => {
  let service: AssetTypesService;
  let repository: Repository<AssetType>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetTypesService,
        {
          provide: getRepositoryToken(AssetType),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AssetTypesService>(AssetTypesService);
    repository = module.get<Repository<AssetType>>(getRepositoryToken(AssetType));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new asset type', async () => {
      const dto: CreateAssetTypeDto = { assetTypeName: 'New Asset Type' };
      const mockAssetType = { assetTypeID: 1, assetTypeName: 'New Asset Type', delflag: false, created_at: new Date(), updated_at: new Date() };

      mockRepository.create.mockReturnValue(mockAssetType);
      mockRepository.save.mockResolvedValue(mockAssetType);

      const result = await service.create(dto);
      expect(result).toEqual({ code: 201, message: 'Asset Type created successfully', metadata: mockAssetType });
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockAssetType);
    });
  });

  describe('findAll', () => {
    it('should retrieve all asset types with pagination', async () => {
      const mockData = [{ assetTypeID: 1, assetTypeName: 'Asset Type 1' }];
      mockRepository.findAndCount.mockResolvedValue([mockData, 1]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        code: 200,
        message: 'Asset Types retrieved successfully',
        metadata: {
          data: mockData,
          total: 1,
          page: 1,
          lastPage: 1,
        },
      });
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        order: {},
      });
    });
  });

  describe('findOne', () => {
    it('should return a single asset type by id', async () => {
      const mockAssetType = { assetTypeID: 1, assetTypeName: 'Asset Type 1' };
      mockRepository.findOne.mockResolvedValue(mockAssetType);

      const result = await service.findOne(1);
      expect(result).toEqual({ code: 200, message: 'Asset Type retrieved successfully', metadata: mockAssetType });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { assetTypeID: 1 } });
    });

    it('should throw NotFoundException if asset type not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should update an asset type', async () => {
  //     const dto: UpdateAssetTypeDto = { assetTypeName: 'Updated Name' };
  //     const mockAssetType = { assetTypeID: 1, assetTypeName: 'Updated Name' };
  //     mockRepository.update.mockResolvedValue({ affected: 1 });
  //     mockRepository.findOne.mockResolvedValue(mockAssetType);
  //
  //     const result = await service.update(1, dto);
  //     expect(result).toEqual({ code: 200, message: 'Asset Type updated successfully', metadata: mockAssetType });
  //     expect(mockRepository.update).toHaveBeenCalledWith({ assetTypeID: 1 }, dto);
  //   });
  //
  //   it('should throw NotFoundException if asset type not found on update', async () => {
  //     mockRepository.update.mockResolvedValue({ affected: 0 });
  //
  //     await expect(service.update(1, { assetTypeName: 'Updated Name' })).rejects.toThrow(NotFoundException);
  //   });
  // });

  describe('remove', () => {
    it('should remove an asset type', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ code: 200, message: 'Asset Type deleted successfully', metadata: null });
      expect(mockRepository.delete).toHaveBeenCalledWith({ assetTypeID: 1 });
    });

    it('should throw NotFoundException if asset type not found on delete', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});


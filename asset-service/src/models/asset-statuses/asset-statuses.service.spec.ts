
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AssetStatusesService } from './asset-statuses.service';
import { AssetStatus } from './entities/asset-status.entity';
import { Repository } from 'typeorm';
import { CreateAssetStatusDto } from './dto/create-asset-status.dto';
import { UpdateAssetStatusDto } from './dto/update-asset-status.dto';

describe('AssetStatusesService', () => {
  let service: AssetStatusesService;
  let repository: Repository<AssetStatus>;

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
        AssetStatusesService,
        {
          provide: getRepositoryToken(AssetStatus),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AssetStatusesService>(AssetStatusesService);
    repository = module.get<Repository<AssetStatus>>(getRepositoryToken(AssetStatus));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new asset status', async () => {
      const dto: CreateAssetStatusDto = { assetStatusName: 'New Status' };
      const mockAssetStatus = { assetStatusID: 1, assetStatusName: 'New Status', delflag: false, created_at: new Date(), updated_at: new Date() };

      mockRepository.create.mockReturnValue(mockAssetStatus);
      mockRepository.save.mockResolvedValue(mockAssetStatus);

      const result = await service.create(dto);
      expect(result).toEqual({ code: 201, message: 'Asset status created successfully', metadata: mockAssetStatus });
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockAssetStatus);
    });
  });

  describe('findAll', () => {
    it('should retrieve all asset statuses with pagination', async () => {
      const mockData = [{ assetStatusID: 1, assetStatusName: 'Status 1' }];
      mockRepository.findAndCount.mockResolvedValue([mockData, 1]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        code: 200,
        message: 'Asset statuses retrieved successfully',
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
    it('should return a single asset status by id', async () => {
      const mockAssetStatus = { assetStatusID: 1, assetStatusName: 'Status 1' };
      mockRepository.findOne.mockResolvedValue(mockAssetStatus);

      const result = await service.findOne(1);
      expect(result).toEqual({ code: 200, message: 'Asset status retrieved successfully', metadata: mockAssetStatus });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { assetStatusID: 1 } });
    });

    it('should throw NotFoundException if asset status not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should update an asset status', async () => {
  //     const dto: UpdateAssetStatusDto = { assetStatusName: 'Updated Status' };
  //     const mockAssetStatus = { assetStatusID: 1, assetStatusName: 'Updated Status' };
  //     mockRepository.update.mockResolvedValue({ affected: 1 });
  //     mockRepository.findOne.mockResolvedValue(mockAssetStatus);
  //
  //     const result = await service.update(1, dto);
  //     expect(result).toEqual({ code: 200, message: 'Asset status updated successfully', metadata: mockAssetStatus });
  //     expect(mockRepository.update).toHaveBeenCalledWith({ assetStatusID: 1 }, dto);
  //   });
  //
  //   it('should throw NotFoundException if asset status not found on update', async () => {
  //     mockRepository.update.mockResolvedValue({ affected: 0 });
  //
  //     await expect(service.update(1, { assetStatusName: 'Updated Status' })).rejects.toThrow(NotFoundException);
  //   });
  // });

  describe('remove', () => {
    it('should remove an asset status', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ code: 200, message: 'Asset status deleted successfully', metadata: null });
      expect(mockRepository.delete).toHaveBeenCalledWith({ assetStatusID: 1 });
    });

    it('should throw NotFoundException if asset status not found on delete', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});


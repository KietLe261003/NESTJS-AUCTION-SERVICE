
import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { NotFoundException } from '@nestjs/common';

describe('AssetsController', () => {
  let controller: AssetsController;
  let service: AssetsService;

  const mockAssetsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [
        {
          provide: AssetsService,
          useValue: mockAssetsService,
        },
      ],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create service and return the created asset', async () => {
      const createAssetDto: CreateAssetDto = {
        assetName: 'Asset 1',
        mainImage: 'image.png',
        assetDescription: 'Description 1',
        assetPrice: 1000,
        inspectorID: 1,
        assetTypeID: 1,
        assetStatusID: 1,
      };

      const result = { code: 201, message: 'Asset created successfully', metadata: createAssetDto };
      mockAssetsService.create.mockResolvedValue(result);

      expect(await controller.create(createAssetDto)).toEqual(result);
      expect(mockAssetsService.create).toHaveBeenCalledWith(createAssetDto);
    });
  });

  describe('findAll', () => {
    it('should call findAll service and return a list of assets', async () => {
      const result = { code: 200, message: 'Asset retrieved successfully', metadata: { data: [], total: 0, page: 1, lastPage: 1 } };
      mockAssetsService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockAssetsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne service and return the asset if found', async () => {
      const assetId = 1;
      const result = { code: 200, message: 'Asset retrieved successfully', metadata: { assetName: 'Asset 1' } };
      mockAssetsService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(assetId)).toEqual(result);
      expect(mockAssetsService.findOne).toHaveBeenCalledWith(assetId);
    });

    it('should throw NotFoundException if asset not found', async () => {
      const assetId = 99;
      mockAssetsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(assetId)).rejects.toThrow(NotFoundException);
      expect(mockAssetsService.findOne).toHaveBeenCalledWith(assetId);
    });
  });

  describe('update', () => {
    it('should call update service and return the updated asset', async () => {
      const updateAssetDto: UpdateAssetDto = { id: 1, assetName: 'Updated Asset' };
      const result = { code: 200, message: 'Asset updated successfully', metadata: updateAssetDto };
      mockAssetsService.update.mockResolvedValue(result);

      expect(await controller.update(updateAssetDto)).toEqual(result);
      expect(mockAssetsService.update).toHaveBeenCalledWith(updateAssetDto.id, updateAssetDto);
    });

    it('should throw NotFoundException if asset to update is not found', async () => {
      const updateAssetDto: UpdateAssetDto = { id: 99, assetName: 'Nonexistent Asset' };
      mockAssetsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(updateAssetDto)).rejects.toThrow(NotFoundException);
      expect(mockAssetsService.update).toHaveBeenCalledWith(updateAssetDto.id, updateAssetDto);
    });
  });

  describe('remove', () => {
    it('should call remove service and return success message', async () => {
      const assetId = 1;
      const result = { code: 200, message: 'Asset deleted successfully', metadata: null };
      mockAssetsService.remove.mockResolvedValue(result);

      expect(await controller.remove(assetId)).toEqual(result);
      expect(mockAssetsService.remove).toHaveBeenCalledWith(assetId);
    });

    it('should throw NotFoundException if asset to delete is not found', async () => {
      const assetId = 99;
      mockAssetsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(assetId)).rejects.toThrow(NotFoundException);
      expect(mockAssetsService.remove).toHaveBeenCalledWith(assetId);
    });
  });
});


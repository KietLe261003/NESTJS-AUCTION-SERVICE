
import { Test, TestingModule } from '@nestjs/testing';
import { AssetStatusesController } from './asset-statuses.controller';
import { AssetStatusesService } from './asset-statuses.service';
import { CreateAssetStatusDto } from './dto/create-asset-status.dto';
import { UpdateAssetStatusDto } from './dto/update-asset-status.dto';

describe('AssetStatusesController', () => {
  let controller: AssetStatusesController;
  let service: AssetStatusesService;

  const mockAssetStatusesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetStatusesController],
      providers: [
        {
          provide: AssetStatusesService,
          useValue: mockAssetStatusesService,
        },
      ],
    }).compile();

    controller = module.get<AssetStatusesController>(AssetStatusesController);
    service = module.get<AssetStatusesService>(AssetStatusesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new asset status', async () => {
      const dto: CreateAssetStatusDto = { assetStatusName: 'New Status' };
      const result = { code: 201, message: 'Asset status created successfully', metadata: {} };

      mockAssetStatusesService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockAssetStatusesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should retrieve all asset statuses', async () => {
      const result = { code: 200, message: 'Asset statuses retrieved successfully', metadata: {} };

      mockAssetStatusesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockAssetStatusesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should retrieve an asset status by id', async () => {
      const result = { code: 200, message: 'Asset status retrieved successfully', metadata: {} };

      mockAssetStatusesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(mockAssetStatusesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an asset status', async () => {
      const dto: UpdateAssetStatusDto = { id: 1, assetStatusName: 'Updated Status' };
      const result = { code: 200, message: 'Asset status updated successfully', metadata: {} };

      mockAssetStatusesService.update.mockResolvedValue(result);

      expect(await controller.update(dto)).toEqual(result);
      expect(mockAssetStatusesService.update).toHaveBeenCalledWith(dto.id, dto);
    });
  });

  describe('remove', () => {
    it('should delete an asset status', async () => {
      const result = { code: 200, message: 'Asset status deleted successfully', metadata: null };

      mockAssetStatusesService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockAssetStatusesService.remove).toHaveBeenCalledWith(1);
    });
  });
});


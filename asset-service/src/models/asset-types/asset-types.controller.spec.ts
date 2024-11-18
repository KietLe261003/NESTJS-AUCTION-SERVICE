
import { Test, TestingModule } from '@nestjs/testing';
import { AssetTypesController } from './asset-types.controller';
import { AssetTypesService } from './asset-types.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

describe('AssetTypesController', () => {
  let controller: AssetTypesController;
  let service: AssetTypesService;

  const mockAssetTypesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetTypesController],
      providers: [
        {
          provide: AssetTypesService,
          useValue: mockAssetTypesService,
        },
      ],
    }).compile();

    controller = module.get<AssetTypesController>(AssetTypesController);
    service = module.get<AssetTypesService>(AssetTypesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new asset type', async () => {
      const dto: CreateAssetTypeDto = { assetTypeName: 'New Type' };
      const result = { code: 201, message: 'Asset Type created successfully', metadata: {} };

      mockAssetTypesService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockAssetTypesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should retrieve all asset types', async () => {
      const result = { code: 200, message: 'Asset Types retrieved successfully', metadata: {} };

      mockAssetTypesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockAssetTypesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should retrieve an asset type by id', async () => {
      const result = { code: 200, message: 'Asset Type retrieved successfully', metadata: {} };

      mockAssetTypesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(mockAssetTypesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an asset type', async () => {
      const dto: UpdateAssetTypeDto = { id: 1, assetTypeName: 'Updated Type' };
      const result = { code: 200, message: 'Asset Type updated successfully', metadata: {} };

      mockAssetTypesService.update.mockResolvedValue(result);

      expect(await controller.update(dto)).toEqual(result);
      expect(mockAssetTypesService.update).toHaveBeenCalledWith(dto.id, dto);
    });
  });

  describe('remove', () => {
    it('should delete an asset type', async () => {
      const result = { code: 200, message: 'Asset Type deleted successfully', metadata: null };

      mockAssetTypesService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockAssetTypesService.remove).toHaveBeenCalledWith(1);
    });
  });
});


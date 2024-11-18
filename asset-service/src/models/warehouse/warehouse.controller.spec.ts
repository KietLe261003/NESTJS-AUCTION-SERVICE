
import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

describe('WarehouseController', () => {
  let controller: WarehouseController;
  let service: WarehouseService;

  const mockWarehouseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [
        {
          provide: WarehouseService,
          useValue: mockWarehouseService,
        },
      ],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call WarehouseService.create and return the result', async () => {
      const dto: CreateWarehouseDto = { location: 'New York' };
      const result = { code: 201, message: 'Warehouse created successfully', metadata: dto };

      mockWarehouseService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockWarehouseService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call WarehouseService.findAll and return the result', async () => {
      const result = {
        code: 200,
        message: 'Warehouse retrieved successfully',
        metadata: { data: [], total: 0, page: 1, lastPage: 1 },
      };

      mockWarehouseService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockWarehouseService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call WarehouseService.findOne and return the result', async () => {
      const result = { code: 200, message: 'Warehouse retrieved successfully', metadata: { warehouseID: 1, location: 'New York' } };

      mockWarehouseService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(mockWarehouseService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call WarehouseService.update and return the result', async () => {
      const dto: UpdateWarehouseDto = { id: 1, location: 'Los Angeles' };
      const result = { code: 200, message: 'Warehouse updated successfully', metadata: dto };

      mockWarehouseService.update.mockResolvedValue(result);

      expect(await controller.update(dto)).toEqual(result);
      expect(mockWarehouseService.update).toHaveBeenCalledWith(dto.id, dto);
    });
  });

  describe('remove', () => {
    it('should call WarehouseService.remove and return the result', async () => {
      const result = { code: 200, message: 'Warehouse deleted successfully', metadata: null };

      mockWarehouseService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockWarehouseService.remove).toHaveBeenCalledWith(1);
    });
  });
});


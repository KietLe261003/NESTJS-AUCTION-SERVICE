
import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { NotFoundException } from '@nestjs/common';

describe('InventoriesController', () => {
  let controller: InventoriesController;
  let service: InventoriesService;

  const mockInventory = {
    inventoryID: 1,
    quantity: 10,
    entryTime: new Date(),
    exitTime: new Date(),
    warehouseID: 1,
    assetID: 1,
    delflag: false,
  };

  const mockInventoriesService = {
    create: jest.fn().mockResolvedValue({
      code: 201,
      message: 'Inventory created successfully',
      metadata: mockInventory,
    }),
    findAll: jest.fn().mockResolvedValue({
      code: 200,
      message: 'Inventories retrieved successfully',
      metadata: {
        data: [mockInventory],
        total: 1,
        page: 1,
        lastPage: 1,
      },
    }),
    findOne: jest.fn().mockResolvedValue({
      code: 200,
      message: 'Inventory retrieved successfully',
      metadata: mockInventory,
    }),
    update: jest.fn().mockResolvedValue({
      code: 200,
      message: 'Inventory updated successfully',
      metadata: mockInventory,
    }),
    remove: jest.fn().mockResolvedValue({
      code: 200,
      message: 'Inventory deleted successfully',
      metadata: null,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesController],
      providers: [
        { provide: InventoriesService, useValue: mockInventoriesService },
      ],
    }).compile();

    controller = module.get<InventoriesController>(InventoriesController);
    service = module.get<InventoriesService>(InventoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an inventory', async () => {
    const createInventoryDto: CreateInventoryDto = {
      quantity: 10,
      entryTime: new Date(),
      exitTime: new Date(),
      warehouseID: 1,
      assetID: 1,
    };
    const result = await controller.create(createInventoryDto);
    expect(result).toEqual({
      code: 201,
      message: 'Inventory created successfully',
      metadata: mockInventory,
    });
    expect(service.create).toHaveBeenCalledWith(createInventoryDto);
  });

  it('should return all inventories', async () => {
    const result = await controller.findAll();
    expect(result).toEqual({
      code: 200,
      message: 'Inventories retrieved successfully',
      metadata: {
        data: [mockInventory],
        total: 1,
        page: 1,
        lastPage: 1,
      },
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single inventory by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      code: 200,
      message: 'Inventory retrieved successfully',
      metadata: mockInventory,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an inventory', async () => {
    const updateInventoryDto: UpdateInventoryDto = {
      id: 1,
      quantity: 20,
      entryTime: new Date(),
      exitTime: new Date(),
      warehouseID: 1,
      assetID: 1,
    };
    const result = await controller.update(updateInventoryDto);
    expect(result).toEqual({
      code: 200,
      message: 'Inventory updated successfully',
      metadata: mockInventory,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateInventoryDto);
  });

  it('should delete an inventory', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({
      code: 200,
      message: 'Inventory deleted successfully',
      metadata: null,
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if inventory is not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });
});


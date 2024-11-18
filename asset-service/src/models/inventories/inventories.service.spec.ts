
import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesService } from './inventories.service';
import { Inventory } from './entities/inventory.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse/warehouse.service';
import { AssetsService } from '../assets/assets.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { NotFoundException } from '@nestjs/common';

describe('InventoriesService', () => {
  let service: InventoriesService;
  let repository: Repository<Inventory>;

  const mockInventoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockWarehouseService = {
    findOne: jest.fn(),
  };

  const mockAssetsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoriesService,
        { provide: getRepositoryToken(Inventory), useValue: mockInventoryRepository },
        { provide: WarehouseService, useValue: mockWarehouseService },
        { provide: AssetsService, useValue: mockAssetsService },
      ],
    }).compile();

    service = module.get<InventoriesService>(InventoriesService);
    repository = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an inventory successfully', async () => {
      const createInventoryDto: CreateInventoryDto = {
        quantity: 10,
        entryTime: new Date(),
        warehouseID: 1,
        assetID: 1,
      };

      mockAssetsService.findOne.mockResolvedValue(true);
      mockWarehouseService.findOne.mockResolvedValue(true);
      mockInventoryRepository.create.mockReturnValue(createInventoryDto);
      mockInventoryRepository.save.mockResolvedValue({ inventoryID: 1, ...createInventoryDto });

      const result = await service.create(createInventoryDto);

      expect(result).toEqual({
        code: 201,
        message: 'Inventory created successfully',
        metadata: { inventoryID: 1, ...createInventoryDto },
      });
    });

    it('should throw NotFoundException if asset does not exist', async () => {
      const createInventoryDto: CreateInventoryDto = {
        quantity: 10,
        entryTime: new Date(),
        warehouseID: 1,
        assetID: 1,
      };

      mockAssetsService.findOne.mockResolvedValue(null);

      await expect(service.create(createInventoryDto)).rejects.toThrow(
        new NotFoundException(`Asset with ID: ${createInventoryDto.assetID} not found`),
      );
    });

    it('should throw NotFoundException if warehouse does not exist', async () => {
      const createInventoryDto: CreateInventoryDto = {
        quantity: 10,
        entryTime: new Date(),
        warehouseID: 1,
        assetID: 1,
      };

      mockAssetsService.findOne.mockResolvedValue(true);
      mockWarehouseService.findOne.mockResolvedValue(null);

      await expect(service.create(createInventoryDto)).rejects.toThrow(
        new NotFoundException(`Warehouse with ID: ${createInventoryDto.warehouseID} not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of inventories', async () => {
      const inventories = [{ inventoryID: 1, quantity: 10, entryTime: new Date() }];
      mockInventoryRepository.findAndCount.mockResolvedValue([inventories, 1]);

      const result = await service.findAll(1, 10);

      expect(result).toEqual({
        code: 200,
        message: 'Inventories retrieved successfully',
        metadata: {
          data: inventories,
          total: 1,
          page: 1,
          lastPage: 1,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single inventory', async () => {
      const inventory = { inventoryID: 1, quantity: 10, entryTime: new Date() };
      mockInventoryRepository.findOne.mockResolvedValue(inventory);

      const result = await service.findOne(1);

      expect(result).toEqual({
        code: 200,
        message: 'Inventory retrieved successfully',
        metadata: inventory,
      });
    });

    it('should throw NotFoundException if inventory does not exist', async () => {
      mockInventoryRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Inventory with ID 1 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update an inventory successfully', async () => {
      const updateInventoryDto: UpdateInventoryDto = { id: 1, quantity: 20 };
      const updatedInventory = { inventoryID: 1, ...updateInventoryDto };

      mockInventoryRepository.update.mockResolvedValue({ affected: 1 });
      mockInventoryRepository.findOne.mockResolvedValue(updatedInventory);

      const result = await service.update(1, updateInventoryDto);

      expect(result).toEqual({
        code: 200,
        message: 'Inventory updated successfully',
        metadata: updatedInventory,
      });
    });

    it('should throw NotFoundException if inventory does not exist', async () => {
      const updateInventoryDto: UpdateInventoryDto = { id: 1, quantity: 20 };

      mockInventoryRepository.update.mockResolvedValue({ affected: 0 });

      await expect(service.update(1, updateInventoryDto)).rejects.toThrow(
        new NotFoundException('Inventory with ID 1 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should delete an inventory successfully', async () => {
      mockInventoryRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({
        code: 200,
        message: 'Inventory deleted successfully',
        metadata: null,
      });
    });

    it('should throw NotFoundException if inventory does not exist', async () => {
      mockInventoryRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Inventory with ID 1 not found'),
      );
    });
  });
});


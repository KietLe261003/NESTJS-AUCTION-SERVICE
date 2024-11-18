
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let repository: Repository<Warehouse>;

  const mockWarehouseRepository = {
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
        WarehouseService,
        {
          provide: getRepositoryToken(Warehouse),
          useValue: mockWarehouseRepository,
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
    repository = module.get<Repository<Warehouse>>(getRepositoryToken(Warehouse));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new warehouse', async () => {
      const dto: CreateWarehouseDto = { location: 'New York' };
      const createdWarehouse = { ...dto, warehouseID: 1 };
      const savedWarehouse = { ...createdWarehouse, delflag: false, created_at: new Date(), updated_at: new Date() };

      mockWarehouseRepository.create.mockReturnValue(createdWarehouse);
      mockWarehouseRepository.save.mockResolvedValue(savedWarehouse);

      const result = await service.create(dto);
      expect(result).toEqual({
        code: 201,
        message: 'Warehouse created successfully',
        metadata: savedWarehouse,
      });
      expect(mockWarehouseRepository.create).toHaveBeenCalledWith(dto);
      expect(mockWarehouseRepository.save).toHaveBeenCalledWith(createdWarehouse);
    });
  });

  describe('findAll', () => {
    it('should return a list of warehouses with pagination', async () => {
      const warehouses = [{ location: 'New York', warehouseID: 1 }];
      const total = 1;
      mockWarehouseRepository.findAndCount.mockResolvedValue([warehouses, total]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        code: 200,
        message: 'Warehouse retrieved successfully',
        metadata: {
          data: warehouses,
          total,
          page: 1,
          lastPage: 1,
        },
      });
      expect(mockWarehouseRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        order: {},
      });
    });
  });

  describe('findOne', () => {
    it('should return a warehouse by ID', async () => {
      const warehouse = { warehouseID: 1, location: 'New York' };
      mockWarehouseRepository.findOne.mockResolvedValue(warehouse);

      const result = await service.findOne(1);
      expect(result).toEqual({
        code: 200,
        message: 'Warehouse retrieved successfully',
        metadata: warehouse,
      });
      expect(mockWarehouseRepository.findOne).toHaveBeenCalledWith({ where: { warehouseID: 1 } });
    });

    it('should throw NotFoundException if warehouse is not found', async () => {
      mockWarehouseRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a warehouse and return the updated warehouse', async () => {
      const dto: UpdateWarehouseDto = { id: 1, location: 'Los Angeles' };
      const updatedWarehouse = { warehouseID: 1, location: 'Los Angeles' };

      mockWarehouseRepository.update.mockResolvedValue({ affected: 1 });
      mockWarehouseRepository.findOne.mockResolvedValue(updatedWarehouse);

      const result = await service.update(dto.id, dto);
      expect(result).toEqual({
        code: 200,
        message: 'Warehouse updated successfully',
        metadata: updatedWarehouse,
      });
      expect(mockWarehouseRepository.update).toHaveBeenCalledWith({ warehouseID: dto.id }, dto);
      expect(mockWarehouseRepository.findOne).toHaveBeenCalledWith({ where: { warehouseID: dto.id } });
    });

    it('should throw NotFoundException if warehouse to update is not found', async () => {
      mockWarehouseRepository.update.mockResolvedValue({ affected: 0 });

      await expect(service.update(1, { id: 1, location: 'Los Angeles' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a warehouse and return success message', async () => {
      mockWarehouseRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({
        code: 200,
        message: 'Warehouse deleted successfully',
        metadata: null,
      });
      expect(mockWarehouseRepository.delete).toHaveBeenCalledWith({ warehouseID: 1 });
    });

    it('should throw NotFoundException if warehouse to delete is not found', async () => {
      mockWarehouseRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});


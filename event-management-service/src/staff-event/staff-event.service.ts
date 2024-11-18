import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStaffEventDto } from './dto/create-staff-event.dto';
import { UpdateStaffEventDto } from './dto/update-staff-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEvent } from './entities/staff-event.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';

@Injectable()
export class StaffEventService {
  constructor(
    @InjectRepository(StaffEvent) private readonly repository: Repository<StaffEvent>,
    private readonly eventService: EventService
  ) { }

  async create(createStaffEventDto: CreateStaffEventDto) {
    const event = await this.eventService.findOne(createStaffEventDto.eventId)
    if (!event) {
      throw new HttpException({
        code: 404,
        message: `Event with ID ${createStaffEventDto.eventId} not found`,
        metadata: null
      }, HttpStatus.NOT_FOUND);
    }
    const created = this.repository.create(createStaffEventDto)
    const saved = await this.repository.save(created)

    const staffEvent = await this.findOne(saved.staffEventId)
    return staffEvent
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    const staffEvent = await this.repository.findOne({ where: { eventId: id } })
    if (!staffEvent) {
      throw new HttpException({
        code: 404,
        message: `Staff event with ID ${id} not found`,
        metadata: null
      }, HttpStatus.NOT_FOUND);
    }
    return staffEvent
  }

  async update(id: number, updateStaffEventDto: UpdateStaffEventDto) {
    return await this.repository.update({ staffEventId: id }, updateStaffEventDto)
  }

  async remove(id: number) {
    await this.repository.delete({ eventId: id })
  }
}

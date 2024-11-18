import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const event = this.repository.create(createEventDto);
    const saved = await this.repository.save(event);
    return saved;
  }

  async findAll() {
    return await this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { eventId: id } })
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return await this.repository.update(id, updateEventDto)
  }

  async remove(id: number) {
    await this.repository.delete({ eventId: id })
    return true
  }
}


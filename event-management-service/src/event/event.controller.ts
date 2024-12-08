import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event-management-service/event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const newEvent = await this.eventService.create(createEventDto)
    return {
      code: 201,
      message: "CREATED",
      metadata: {
        event: newEvent
      }
    }
  }

  @Get()
  async findAll() {
    const data = await this.eventService.findAll()
    return {
      code: 200,
      message: "OK",
      metadata: {
        events: data
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const event = await this.eventService.findOne(id)
    return {
      code: 200,
      message: "OK",
      metadata: {
        event: event
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    const updated = await this.eventService.update(id, updateEventDto)
    return {
      code: 200,
      message: "OK",
      metadata: {
        event: updated
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.eventService.remove(+id)
    return {
      code: 200,
      message: "OK",
      metadata: null
    }
  }
}

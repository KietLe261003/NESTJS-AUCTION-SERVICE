import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffEventService } from './staff-event.service';
import { CreateStaffEventDto } from './dto/create-staff-event.dto';
import { UpdateStaffEventDto } from './dto/update-staff-event.dto';

@Controller('event-management-service/staff-event')
export class StaffEventController {
  constructor(private readonly staffEventService: StaffEventService) { }

  @Post()
  async create(@Body() createStaffEventDto: CreateStaffEventDto) {
    const newStaffEvent = await this.staffEventService.create(createStaffEventDto)
    return {
      code: 201,
      message: "OK",
      metadata: {
        staffEvent: newStaffEvent
      }
    }
  }

  @Get()
  async findAll() {
    const data = await this.staffEventService.findAll()
    return {
      code: 200,
      message: 'ok',
      metadata: {
        staffevents: data
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const staffEvent = await this.staffEventService.findOne(id)
    return {
      code: 200,
      message: 'ok',
      metadata: {
        staffevent: staffEvent
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateStaffEventDto: UpdateStaffEventDto) {
    const updated = await this.staffEventService.update(id, updateStaffEventDto)
    return {
      code: 200,
      message: 'ok',
      metadata: {
        staffevent: updated
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.staffEventService.remove(id)
    return {
      code: 200,
      message: 'OK',
      metadata: null
    }
  }
}

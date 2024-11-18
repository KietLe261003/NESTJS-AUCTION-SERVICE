import { Module } from '@nestjs/common';
import { StaffEventService } from './staff-event.service';
import { StaffEventController } from './staff-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEvent } from './entities/staff-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEvent])],
  controllers: [StaffEventController],
  providers: [StaffEventService],
})
export class StaffEventModule { }

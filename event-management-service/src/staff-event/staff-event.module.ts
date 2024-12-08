import { Module } from '@nestjs/common';
import { StaffEventService } from './staff-event.service';
import { StaffEventController } from './staff-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/event/event.module';
import { StaffEvent } from './entities/staff-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEvent]), EventModule],
  controllers: [StaffEventController],
  providers: [StaffEventService],
})
export class StaffEventModule { }

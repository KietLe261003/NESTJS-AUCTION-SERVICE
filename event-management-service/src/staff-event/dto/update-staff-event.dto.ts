import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffEventDto } from './create-staff-event.dto';

export class UpdateStaffEventDto extends PartialType(CreateStaffEventDto) {}

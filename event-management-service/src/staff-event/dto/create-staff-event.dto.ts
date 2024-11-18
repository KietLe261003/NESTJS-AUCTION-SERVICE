import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStaffEventDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}

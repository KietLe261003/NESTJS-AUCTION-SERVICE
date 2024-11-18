import { Test, TestingModule } from '@nestjs/testing';
import { StaffEventController } from './staff-event.controller';
import { StaffEventService } from './staff-event.service';

describe('StaffEventController', () => {
  let controller: StaffEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffEventController],
      providers: [StaffEventService],
    }).compile();

    controller = module.get<StaffEventController>(StaffEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

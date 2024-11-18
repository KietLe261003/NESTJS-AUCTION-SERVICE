import { Test, TestingModule } from '@nestjs/testing';
import { StaffEventService } from './staff-event.service';

describe('StaffEventService', () => {
  let service: StaffEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffEventService],
    }).compile();

    service = module.get<StaffEventService>(StaffEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

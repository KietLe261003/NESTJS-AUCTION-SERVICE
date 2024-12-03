import { Test, TestingModule } from '@nestjs/testing';
import { ImageAssetsService } from './image-assets.service';

describe('ImageAssetsService', () => {
  let service: ImageAssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageAssetsService],
    }).compile();

    service = module.get<ImageAssetsService>(ImageAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

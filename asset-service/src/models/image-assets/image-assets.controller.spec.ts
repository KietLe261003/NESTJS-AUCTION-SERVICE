import { Test, TestingModule } from '@nestjs/testing';
import { ImageAssetsController } from './image-assets.controller';
import { ImageAssetsService } from './image-assets.service';

describe('ImageAssetsController', () => {
  let controller: ImageAssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageAssetsController],
      providers: [ImageAssetsService],
    }).compile();

    controller = module.get<ImageAssetsController>(ImageAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

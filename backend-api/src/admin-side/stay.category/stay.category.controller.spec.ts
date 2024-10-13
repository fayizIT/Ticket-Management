import { Test, TestingModule } from '@nestjs/testing';
import { StayCategoryController } from './stay.category.controller';
import { StayCategoryService } from './stay.category.service';

describe('StayCategoryController', () => {
  let controller: StayCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StayCategoryController],
      providers: [StayCategoryService],
    }).compile();

    controller = module.get<StayCategoryController>(StayCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

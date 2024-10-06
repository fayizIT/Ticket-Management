import { Test, TestingModule } from '@nestjs/testing';
import { AgeCategoryController } from './age.category.controller';
import { AgeCategoryService } from './age.category.service';

describe('AgeCategoryController', () => {
  let controller: AgeCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgeCategoryController],
      providers: [AgeCategoryService],
    }).compile();

    controller = module.get<AgeCategoryController>(AgeCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

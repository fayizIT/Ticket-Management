import { Test, TestingModule } from '@nestjs/testing';
import { AgeCategoryService } from './age.category.service';

describe('AgeCategoryService', () => {
  let service: AgeCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgeCategoryService],
    }).compile();

    service = module.get<AgeCategoryService>(AgeCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

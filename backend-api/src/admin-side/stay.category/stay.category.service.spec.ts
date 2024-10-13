import { Test, TestingModule } from '@nestjs/testing';
import { StayCategoryService } from './stay.category.service';

describe('StayCategoryService', () => {
  let service: StayCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StayCategoryService],
    }).compile();

    service = module.get<StayCategoryService>(StayCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

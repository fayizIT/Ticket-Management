import { Test, TestingModule } from '@nestjs/testing';
import { UserHomepageService } from './user-homepage.service';

describe('UserHomepageService', () => {
  let service: UserHomepageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHomepageService],
    }).compile();

    service = module.get<UserHomepageService>(UserHomepageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

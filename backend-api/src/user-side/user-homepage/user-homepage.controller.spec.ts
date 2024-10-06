import { Test, TestingModule } from '@nestjs/testing';
import { UserHomepageController } from './user-homepage.controller';
import { UserHomepageService } from './user-homepage.service';

describe('UserHomepageController', () => {
  let controller: UserHomepageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHomepageController],
      providers: [UserHomepageService],
    }).compile();

    controller = module.get<UserHomepageController>(UserHomepageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

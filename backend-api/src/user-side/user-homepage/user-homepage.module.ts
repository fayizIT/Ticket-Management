import { Module } from '@nestjs/common';
import { UserHomepageService } from './user-homepage.service';
import { UserHomepageController } from './user-homepage.controller';

@Module({
  controllers: [UserHomepageController],
  providers: [UserHomepageService],
})
export class UserHomepageModule {}

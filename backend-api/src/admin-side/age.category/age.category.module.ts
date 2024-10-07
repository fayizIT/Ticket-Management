import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgeCategory, AgeCategorySchema } from './entities/age.category.entity';
import { AgeCategoryService } from './age.category.service';
import { AgeCategoryController } from './age.category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AgeCategory.name, schema: AgeCategorySchema }]),
  ],
  controllers: [AgeCategoryController],
  providers: [AgeCategoryService],
  exports: [AgeCategoryService, MongooseModule], // Export the service and the MongooseModule
})
export class AgeCategoryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgeCategoryService } from './age.category.service';
import { AgeCategoryController } from './age.category.controller';
import { AgeCategory, AgeCategorySchema } from './entities/age.category.entity'; // Import the entity and schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AgeCategory.name, schema: AgeCategorySchema }]), // Register the model with Mongoose
  ],
  controllers: [AgeCategoryController],
  providers: [AgeCategoryService],
})
export class AgeCategoryModule {}

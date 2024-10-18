import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StayCategoryService } from './stay.category.service';
import { StayCategoryController } from './stay.category.controller';
import { StayCategory, StayCategorySchema } from './entities/stay.category.entity';
// import { StayCategory, StayCategorySchema } from 

@Module({
  imports: [MongooseModule.forFeature([{ name: StayCategory.name, schema: StayCategorySchema }])],
  controllers: [StayCategoryController],
  providers: [StayCategoryService],
  exports: [StayCategoryService],
})
export class StayCategoryModule {}

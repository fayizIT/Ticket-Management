import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketCategory, TicketCategorySchema } from './entities/ticket.category.entity';
import {  TicketCategoryService } from './ticket.category.service';
import { TicketCategoryController } from './ticket.category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TicketCategory.name, schema: TicketCategorySchema }]),
  ],
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
  exports: [TicketCategoryService, MongooseModule], 
})
export class TicketCategoryModule {}

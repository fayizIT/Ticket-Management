import { Module } from '@nestjs/common';
import { TicketController } from './ticket.cart.controller';
import { TicketService } from './ticket.cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.cart.entity';
import { AgeCategoryModule } from '../age.category/age.category.module';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    AgeCategoryModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketCartModule {}

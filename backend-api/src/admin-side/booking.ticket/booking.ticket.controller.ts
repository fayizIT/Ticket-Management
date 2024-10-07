import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingTicketService } from './booking.ticket.service';
import { CreateBookingTicketDto } from './dto/create-booking.ticket.dto';
import { UpdateBookingTicketDto } from './dto/update-booking.ticket.dto';

@Controller('booking.ticket')
export class BookingTicketController {
  constructor(private readonly bookingTicketService: BookingTicketService) {}

  @Post()
  create(@Body() createBookingTicketDto: CreateBookingTicketDto) {
    return this.bookingTicketService.create(createBookingTicketDto);
  }

  @Get()
  findAll() {
    return this.bookingTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingTicketDto: UpdateBookingTicketDto) {
    return this.bookingTicketService.update(+id, updateBookingTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingTicketService.remove(+id);
  }
}

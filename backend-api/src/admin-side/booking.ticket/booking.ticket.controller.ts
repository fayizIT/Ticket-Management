import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.ticket.service';
import { CreateBookingDto } from './dto/create-booking.ticket.dto';
import { Booking } from './entities/booking.ticket.entity';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post()
    async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.create(createBookingDto);
    }

    @Get()
    async findAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }

    @Patch(':id/confirm-payment')  // Correct method and URL pattern
    async confirmPayment(@Param('id') bookingId: string): Promise<Booking> {
        return this.bookingService.confirmPayment(bookingId);
    }
}

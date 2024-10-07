// src/bookings/booking.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { BookingService } from './booking.ticket.service'; 
import { CreateBookingDto } from './dto/create-booking.ticket.dto'; 

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Create a new booking
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  // Get all bookings
  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  // Get a specific booking by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  // Update a booking by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookingDto: Partial<CreateBookingDto>) {
    return this.bookingService.update(id, updateBookingDto);
  }

  // // Delete a booking by ID
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.bookingService.remove(id);
  // }
}

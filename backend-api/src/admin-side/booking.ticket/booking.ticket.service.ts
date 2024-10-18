// src/bookings/booking.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.ticket.dto'; 
import { Booking, BookingDocument } from './entities/booking.ticket.entity';
import { TicketCategoryService } from '../ticket.category/ticket.category.service'; 


@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private ticketCategoryService: TicketCategoryService, // Inject AgeCategoryService
  ) {}

  // Create a booking
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Validate ticket  categories
    const ticketCategoryIds = createBookingDto.ticketCategories.map(item => item.ticketCategoryId);
    
    // Fetch all ticket  categories to check validity
    const validTicketCategories = await this.ticketCategoryService.findAll();
    const validTicketCategoryIds = validTicketCategories.map(cat => cat._id.toString());

    // Check if all provided ticket category IDs are valid
    const invalidIds = ticketCategoryIds.filter(id => !validTicketCategoryIds.includes(id));
    if (invalidIds.length > 0) {
      throw new NotFoundException(`Invalid ticket category IDs: ${invalidIds.join(', ')}`);
    }

    // Proceed to create the booking if all IDs are valid
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }


  // Get all bookings
  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  // Find a booking by ID
  async findOne(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }

  // Update a booking
  async update(id: string, updateBookingDto: Partial<CreateBookingDto>): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
  }

  // // Delete a booking
  // async remove(id: string): Promise<Booking> {
  //   return this.bookingModel.findByIdAndRemove(id).exec();
  // }
}

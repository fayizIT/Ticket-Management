import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    InternalServerErrorException,
    BadRequestException,
  } from '@nestjs/common';
  import { BookingService } from './booking.ticket.service';
  import { CreateBookingDto } from './dto/create-booking.ticket.dto';
  import { Booking } from './entities/booking.ticket.entity';
  import { SendOtpDto } from './dto/send-otp.dto';
  import { VerifyOtpDto } from './dto/verify-otp.dto';
  
  @Controller('bookings')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Post()
    async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
      try {
        return await this.bookingService.create(createBookingDto);
      } catch (error) {
        this.handleError(error);
      }
    }
  
    @Get()
    async findAll(): Promise<Booking[]> {
      try {
        return await this.bookingService.findAll();
      } catch (error) {
        this.handleError(error);
      }
    }
  
    @Patch(':id/confirm-payment')
    async confirmPayment(@Param('id') bookingId: string): Promise<Booking> {
      try {
        return await this.bookingService.confirmPayment(bookingId);
      } catch (error) {
        this.handleError(error);
      }
    }
  
    @Post('send-otp')
    async sendOtp(@Body() sendOtpDto: SendOtpDto) {
      try {
        const bookings = await this.bookingService.findAll();
        const bookingExists = bookings.find(
          (booking) => booking.email === sendOtpDto.email,
        );
  
        if (!bookingExists) {
          throw new BadRequestException('Email not found in bookings.');
        }
  
        const otp = this.bookingService.generateOtp();
        await this.bookingService.sendOtp(
          sendOtpDto.email,
          bookingExists.fullName,
          otp,
        );
  
        return { message: 'OTP has been sent successfully to your email.' };
      } catch (error) {
        this.handleError(error);
      }
    }
  
    @Post('verify-otp')
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
      try {
        return await this.bookingService.verifyOtp(
          verifyOtpDto.email,
          verifyOtpDto.otp,
        );
      } catch (error) {
        this.handleError(error);
      }
    }
  
    private handleError(error: any): void {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later.',
      );
    }
  }
  
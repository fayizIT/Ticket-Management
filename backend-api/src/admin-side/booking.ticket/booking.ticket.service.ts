import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { Booking, BookingDocument } from './entities/booking.ticket.entity';
  import { CreateBookingDto } from './dto/create-booking.ticket.dto';
  import { Coupon } from '../coupon/entities/coupon.entity';
  import Razorpay from 'razorpay';
  import { OtpService } from './OtpService';
  import { MailService } from './mail.service';
  
  @Injectable()
  export class BookingService {
    private readonly GST_RATE = 0.18;
    private razorpayInstance: Razorpay;
    private otpStore = new Map<string, string>();
  
    constructor(
      @InjectModel(Booking.name) private bookingModel: Model<Booking>,
      @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
      @InjectModel('TicketCategory') private ticketModel: Model<any>,
      @InjectModel('StayCategory') private stayModel: Model<any>,
      private readonly otpService: OtpService,
      private readonly mailService: MailService, 
    ) {
      // Initialize Razorpay instance with your credentials
      this.razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
    }
  
    async create(createBookingDto: CreateBookingDto): Promise<any> {
      const today = new Date();
      const visitDate = new Date(createBookingDto.dateOfVisit);
  
      // Check if the visit date is valid
      if (visitDate < today) {
        throw new BadRequestException('Date of visit cannot be in the past.');
      }
  
      // Ensure ObjectId types are preserved
      createBookingDto.ticketCategories = createBookingDto.ticketCategories.map(
        (ticket) => ({
          ticketCategoryId: ticket.ticketCategoryId,
          quantity: ticket.quantity,
          price: ticket.price,
        }),
      );
  
      createBookingDto.stayCategories = createBookingDto.stayCategories.map(
        (stay) => ({
          stayCategoryId: stay.stayCategoryId,
          quantity: stay.quantity,
          price: stay.price,
        }),
      );
  
      if (createBookingDto.couponDiscountId) {
        createBookingDto.couponDiscountId = new Types.ObjectId(
          createBookingDto.couponDiscountId,
        );
      }
  
      // Validate categories before processing
      try {
        await this.validateTicketAndStayCategories(
          createBookingDto.ticketCategories,
          createBookingDto.stayCategories,
        );
      } catch (error) {
        throw new InternalServerErrorException(
          'Validation of categories failed.',
        );
      }
  
      let discountPercentage = 0;
      if (createBookingDto.couponDiscountId) {
        try {
          const coupon = await this.couponModel.findById(
            createBookingDto.couponDiscountId,
          );
          if (!coupon) {
            throw new BadRequestException('Invalid coupon code.');
          }
          discountPercentage = coupon.discount;
        } catch (error) {
          throw new InternalServerErrorException(
            'Failed to fetch coupon details.',
          );
        }
      }
  
      const { total, totalTicket, totalStay } = this.calculateTotalAmount(
        createBookingDto.ticketCategories,
        createBookingDto.stayCategories,
        discountPercentage,
      );
  
      const lastTotal = totalTicket + totalStay;
      const gstAmount = lastTotal * this.GST_RATE;
      const grandTotal = total + gstAmount;
  
      const booking = new this.bookingModel({
        ...createBookingDto,
        totalAmount: totalTicket,
        gstAmount,
        grandTotal,
        discount: discountPercentage,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      try {
        const savedBooking = await booking.save();
  
        // Initiate payment and get order details
        const orderDetails = await this.initiatePayment(savedBooking);
  
        // Return both booking and order details
        return {
          bookingId: savedBooking._id.toString(),
          grandTotal: savedBooking.grandTotal,
          orderId: orderDetails.id,
        };
      } catch (error) {
        console.error('Error saving booking:', error);
        throw new InternalServerErrorException(
          'Failed to create booking. Please try again later.',
        );
      }
    }
  
    private async initiatePayment(booking: Booking) {
      const options = {
        amount: Math.round(booking.grandTotal * 100),
        currency: 'INR',
        receipt: booking._id.toString(),
        notes: {
          bookingId: booking._id.toString(),
        },
      };
  
      try {
        const response = await this.razorpayInstance.orders.create(options);
        return response;
      } catch (error) {
        console.error('Razorpay payment initiation error:', error);
        throw new InternalServerErrorException(
          'Failed to initiate payment with Razorpay.',
        );
      }
    }
  
    private async validateTicketAndStayCategories(
      ticketCategories: {
        ticketCategoryId: Types.ObjectId;
        quantity: number;
        price: number;
      }[],
      stayCategories: {
        stayCategoryId: Types.ObjectId;
        quantity: number;
        price: number;
      }[],
    ) {
      if (!ticketCategories || !Array.isArray(ticketCategories)) {
        throw new BadRequestException(
          'Ticket categories must be provided and must be an array.',
        );
      }
      if (!stayCategories || !Array.isArray(stayCategories)) {
        throw new BadRequestException(
          'Stay categories must be provided and must be an array.',
        );
      }
  
      const ticketIds = ticketCategories.map((item) => item.ticketCategoryId);
      const stayIds = stayCategories.map((item) => item.stayCategoryId);
  
      try {
        const tickets = await this.ticketModel.find({ _id: { $in: ticketIds } });
        const stays = await this.stayModel.find({ _id: { $in: stayIds } });
  
        if (tickets.length !== ticketIds.length) {
          throw new BadRequestException(
            'One or more ticket categories are invalid.',
          );
        }
        if (stays.length !== stayIds.length) {
          throw new BadRequestException(
            'One or more stay categories are invalid.',
          );
        }
      } catch (error) {
        throw new InternalServerErrorException('Failed to validate categories.');
      }
    }
  
    private calculateTotalAmount(
      ticketCategories: { price: number; quantity: number }[],
      stayCategories: { price: number; quantity: number }[],
      discountPercentage: number,
    ): { total: number; totalTicket: number; totalStay: number } {
      // Calculate ticket totals
      const ticketTotal = ticketCategories.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
  
      // Calculate stay totals
      const stayTotal = stayCategories.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
  
      // Apply discount only on ticket total
      const discountedTicketTotal =
        ticketTotal - ticketTotal * (discountPercentage / 100);
  
      return {
        total: discountedTicketTotal + stayTotal,
        totalTicket: discountedTicketTotal,
        totalStay: stayTotal,
      };
    }
  
    async findAll(): Promise<Booking[]> {
      try {
        const bookings = await this.bookingModel.find().exec();
        if (!bookings || bookings.length === 0) {
          throw new BadRequestException('No bookings found.');
        }
        return bookings;
      } catch (error) {
        throw new InternalServerErrorException(
          'Failed to fetch bookings. Please try again later.',
        );
      }
    }
  
    async confirmPayment(bookingId: string): Promise<Booking> {
      const booking = await this.bookingModel.findById(bookingId);
      if (!booking) {
        throw new BadRequestException('Booking not found.');
      }
  
      // Update payment status
      booking.paymentStatus = true;
  
      try {
        const updatedBooking = await booking.save();
    
        // Send confirmation email
        await this.mailService.sendBookingConfirmation(
          booking.email,
          booking.fullName,
          {
            bookingId: updatedBooking._id,
            totalAmount: updatedBooking.grandTotal,
            dateOfVisit: updatedBooking.dateOfVisit,
          },
        );
    
        return updatedBooking;
      } catch (error) {
        throw new InternalServerErrorException(
          'Failed to update payment status.',
        );
      }
    }
  
    async sendOtp(email: string, fullName: string, otp: string): Promise<void> {
      const bookingExists = await this.bookingModel.findOne({ email }).exec();
      if (!bookingExists) {
        throw new BadRequestException('Email not found in bookings.');
      }
  
      try {
        await this.otpService.sendOtp(email, fullName, otp);
  
        // Store the OTP temporarily
        this.otpStore.set(email, otp);
      } catch (error) {
        throw new InternalServerErrorException('Failed to send OTP.');
      }
    }
  
    async verifyOtp(email: string, otp: string): Promise<any> {
      const storedOtp = this.otpStore.get(email);
  
      if (!storedOtp) {
        throw new BadRequestException('OTP not sent or expired.');
      }
  
      if (storedOtp !== otp) {
        throw new BadRequestException('Invalid OTP.');
      }
  
      this.otpStore.delete(email);
  
      try {
        const bookings = await this.bookingModel.find({ email }).exec();
        if (!bookings || bookings.length === 0) {
          throw new BadRequestException('No bookings found for this email.');
        }
  
        const filteredBookings = bookings.filter(
          (booking) => booking.paymentStatus === true,
        );
        return filteredBookings.map(
          ({
            fullName,
            phoneNumber,
            email: userEmail,
            dateOfVisit,
            totalVisitors,
            grandTotal,
          }) => {
            console.log({
              fullName,
              phoneNumber,
              userEmail,
              dateOfVisit,
              totalVisitors,
              grandTotal,
            });
  
            return {
              fullName,
              phoneNumber,
              email: userEmail,
              dateOfVisit,
              totalVisitors,
              grandTotal,
            };
          },
        );
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch bookings.');
      }
    }
  
    public generateOtp(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  }
  
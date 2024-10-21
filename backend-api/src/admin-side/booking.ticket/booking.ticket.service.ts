import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './entities/booking.ticket.entity';
import { CreateBookingDto } from './dto/create-booking.ticket.dto';
import { Coupon } from '../coupon/entities/coupon.entity';
import Razorpay from 'razorpay';

@Injectable()
export class BookingService {
    private readonly GST_RATE = 0.18; // 18%
    private razorpayInstance: Razorpay;

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
        @InjectModel('TicketCategory') private ticketModel: Model<any>,
        @InjectModel('StayCategory') private stayModel: Model<any>,
    ) {
        // Initialize Razorpay instance with your credentials
        this.razorpayInstance = new Razorpay({
            key_id: 'rzp_test_vGGGd2XhY2l19v',   
            key_secret: 'sZ1yJrVgiaoDcF7OVdqV7I5T', 
        });
    }

    async create(createBookingDto: CreateBookingDto): Promise<any> { // Change return type to any or a specific interface if needed
        const today = new Date();
        const visitDate = new Date(createBookingDto.dateOfVisit);

        // Check if the visit date is valid
        if (visitDate < today) {
            throw new BadRequestException('Date of visit cannot be in the past.');
        }

        // Ensure ObjectId types are preserved
        createBookingDto.ticketCategories = createBookingDto.ticketCategories.map(ticket => ({
            ticketCategoryId: ticket.ticketCategoryId,
            quantity: ticket.quantity,
            price: ticket.price,
        }));

        createBookingDto.stayCategories = createBookingDto.stayCategories.map(stay => ({
            stayCategoryId: stay.stayCategoryId,
            quantity: stay.quantity,
            price: stay.price,
        }));

        if (createBookingDto.couponDiscountId) {
            createBookingDto.couponDiscountId = new Types.ObjectId(createBookingDto.couponDiscountId);
        }

        // Validate categories before processing
        await this.validateTicketAndStayCategories(
            createBookingDto.ticketCategories,
            createBookingDto.stayCategories,
        );

        let discountPercentage = 0;
        if (createBookingDto.couponDiscountId) {
            const coupon = await this.couponModel.findById(createBookingDto.couponDiscountId);
            if (!coupon) {
                throw new BadRequestException('Invalid coupon code.');
            }
            discountPercentage = coupon.discount; // Assuming discount is a percentage
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
            console.log('Booking saved:', savedBooking); // Log saved booking
            
            // Initiate payment and get order details
            const orderDetails = await this.initiatePayment(savedBooking);
            console.log('Order details from Razorpay:', orderDetails); // Log order details
            
            // Return both booking and order details
            return {
                bookingId: savedBooking._id.toString(),  // Return the booking ID
                grandTotal: savedBooking.grandTotal,
                orderId: orderDetails.id, // Razorpay order ID
            };
        } catch (error) {
            console.error('Error saving booking:', error); // Log error details
            throw new InternalServerErrorException('Failed to create booking. Please try again later.');
        }
    }

    private async initiatePayment(booking: Booking) {
        const options = {
            amount: Math.round(booking.grandTotal * 100), // Round to the nearest integer
            currency: 'INR',
            receipt: booking._id.toString(), // Use booking ID as the receipt
            notes: {
                bookingId: booking._id.toString(),
            },
        };
    
        try {
            const response = await this.razorpayInstance.orders.create(options);
            // Return the response to the caller
            return response;
        } catch (error) {
            console.error('Razorpay payment initiation error:', error);
            throw new InternalServerErrorException('Failed to initiate payment with Razorpay.');
        }
    }
    


    private async validateTicketAndStayCategories(ticketCategories: { ticketCategoryId: Types.ObjectId; quantity: number; price: number; }[], stayCategories: { stayCategoryId: Types.ObjectId; quantity: number; price: number; }[]) {
        if (!ticketCategories || !Array.isArray(ticketCategories)) {
            throw new BadRequestException('Ticket categories must be provided and must be an array.');
        }
        if (!stayCategories || !Array.isArray(stayCategories)) {
            throw new BadRequestException('Stay categories must be provided and must be an array.');
        }

        const ticketIds = ticketCategories.map(item => item.ticketCategoryId);
        const stayIds = stayCategories.map(item => item.stayCategoryId);

        const tickets = await this.ticketModel.find({ _id: { $in: ticketIds } });
        const stays = await this.stayModel.find({ _id: { $in: stayIds } });

        if (tickets.length !== ticketIds.length) {
            throw new BadRequestException('One or more ticket categories are invalid.');
        }
        if (stays.length !== stayIds.length) {
            throw new BadRequestException('One or more stay categories are invalid.');
        }
    }

    private calculateTotalAmount(ticketCategories: { price: number; quantity: number; }[], stayCategories: { price: number; quantity: number; }[], discountPercentage: number): { total: number, totalTicket: number, totalStay: number } {
        // Calculate ticket totals
        const ticketTotal = ticketCategories.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Calculate stay totals
        const stayTotal = stayCategories.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Apply discount only on ticket total
        const discountedTicketTotal = ticketTotal - (ticketTotal * (discountPercentage / 100));

        return {
            total: discountedTicketTotal + stayTotal, // Total is discounted ticket total + stay total
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
            throw new InternalServerErrorException('Failed to fetch bookings. Please try again later.');
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
            return await booking.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to update payment status.');
        }
    }
    
}

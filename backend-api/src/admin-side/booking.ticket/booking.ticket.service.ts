import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './entities/booking.ticket.entity';
import { CreateBookingDto } from './dto/create-booking.ticket.dto';
import { Coupon } from '../coupon/entities/coupon.entity';

@Injectable()
export class BookingService {
    private readonly GST_RATE = 0.18; // 18%

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
        @InjectModel('TicketCategory') private ticketModel: Model<any>, 
        @InjectModel('StayCategory') private stayModel: Model<any>, 
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const today = new Date();
        const visitDate = new Date(createBookingDto.dateOfVisit);

        // Check if the visit date is valid
        if (visitDate < today) {
            throw new BadRequestException('Date of visit cannot be in the past.');
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
        const grandTotal = total + gstAmount; // Grand total includes total stay and GST

        const booking = new this.bookingModel({
            ...createBookingDto,
            totalAmount: totalTicket,
            gstAmount,
            grandTotal,
            discount: discountPercentage, // Store discount percentage
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        try {
            return await booking.save(); // Awaiting save to handle potential errors
        } catch (error) {
            throw new InternalServerErrorException('Failed to create booking. Please try again later.');
        }
    }

    private async validateTicketAndStayCategories(ticketCategories: { ticketCategoryId: string; quantity: number; price: number; }[], stayCategories: { stayCategoryId: string; quantity: number; price: number; }[]) {
        if (!ticketCategories || !Array.isArray(ticketCategories)) {
            throw new BadRequestException('Ticket categories must be provided and must be an array.');
        }
        if (!stayCategories || !Array.isArray(stayCategories)) {
            throw new BadRequestException('Stay categories must be provided and must be an array.');
        }
    
        const ticketIds = ticketCategories.map(item => item.ticketCategoryId);
        const stayIds = stayCategories.map(item => item.stayCategoryId); // Ensure this is the correct key
    
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
        const discountedTicketTotal = ticketTotal - (ticketTotal * (discountPercentage / 100)); // Apply percentage discount

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
}

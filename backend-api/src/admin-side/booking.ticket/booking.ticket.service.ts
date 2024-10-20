// import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Booking } from './entities/booking.ticket.entity';
// import { CreateBookingDto } from './dto/create-booking.ticket.dto';
// import { Coupon } from '../coupon/entities/coupon.entity';
// import { RazorpayService } from '../razorpay/razorpay.service';
// import { ConfirmPaymentDto } from '../razorpay/dto/confirm-payment.dto';

// @Injectable()
// export class BookingService {
//     private readonly GST_RATE = 0.18; // 18%

//     constructor(
//         @InjectModel(Booking.name) private bookingModel: Model<Booking>,
//         @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
//         @InjectModel('TicketCategory') private ticketModel: Model<any>, 
//         @InjectModel('StayCategory') private stayModel: Model<any>,
//         private readonly razorpayService: RazorpayService, // Inject RazorpayService
//     ) {}

//     async create(createBookingDto: CreateBookingDto): Promise<Booking> {
//         const today = new Date();
//         const visitDate = new Date(createBookingDto.dateOfVisit);

//         // Check if the visit date is valid
//         if (visitDate < today) {
//             throw new BadRequestException('Date of visit cannot be in the past.');
//         }

//         // Convert string IDs to ObjectId
//         createBookingDto.ticketCategories = createBookingDto.ticketCategories.map(ticket => ({
//             ticketCategoryId: new Types.ObjectId(ticket.ticketCategoryId), // Keep as ObjectId
//             quantity: ticket.quantity,
//             price: ticket.price,
//         }));

//         createBookingDto.stayCategories = createBookingDto.stayCategories.map(stay => ({
//             stayCategoryId: new Types.ObjectId(stay.stayCategoryId), // Keep as ObjectId
//             quantity: stay.quantity,
//             price: stay.price,
//         }));

//         if (createBookingDto.couponDiscountId) {
//             createBookingDto.couponDiscountId = new Types.ObjectId(createBookingDto.couponDiscountId);
//         }

//         // Validate categories before processing
//         await this.validateTicketAndStayCategories(
//             createBookingDto.ticketCategories,
//             createBookingDto.stayCategories,
//         );

//         let discountPercentage = 0;
//         if (createBookingDto.couponDiscountId) {
//             const coupon = await this.couponModel.findById(createBookingDto.couponDiscountId);
//             if (!coupon) {
//                 throw new BadRequestException('Invalid coupon code.');
//             }
//             discountPercentage = coupon.discount; // Assuming discount is a percentage
//         }

//         // const { total, totalTicket, totalStay } = this.calculateTotalAmount(
//         //     createBookingDto.ticketCategories,
//         //     createBookingDto.stayCategories,
//         //     discountPercentage,
//         // );

//         // const lastTotal = totalTicket + totalStay;
//         // const gstAmount = lastTotal * this.GST_RATE;
//         // const grandTotal = total + gstAmount; // Grand total includes total stay and GST

//         // const booking = new this.bookingModel({
//         //     ...createBookingDto,
//         //     totalAmount: totalTicket,
//         //     gstAmount,
//         //     grandTotal,
//         //     discount: discountPercentage, // Store discount percentage
//         //     createdAt: new Date(),
//         //     updatedAt: new Date(),
//         // });

//          // Create a Razorpay order with the grand total


         

//          const { total, totalTicket, totalStay } = this.calculateTotalAmount(
//             createBookingDto.ticketCategories,
//             createBookingDto.stayCategories,
//             discountPercentage,
//         );
        
//         const lastTotal = totalTicket + totalStay;
//         const gstAmount = lastTotal * this.GST_RATE;
//         const grandTotal = total + gstAmount;
        
//         console.log('Last Total (Rupees):', lastTotal);
//         console.log('GST Amount (Rupees):', gstAmount);
//         console.log('Grand Total (Rupees):', grandTotal);

//         const currency = 'INR'; 
        
//         const grandTotalInPaise = Math.round(grandTotal * 100); // Should be fine
//         console.log('Grand Total in Paise:', grandTotalInPaise);
        
//         try {
//             const razorpayOrder = await this.razorpayService.createOrder(grandTotalInPaise, currency);
//         } catch (error) {
//             console.error('Error during Razorpay order creation:', error);
//             throw new InternalServerErrorException('Failed to create Razorpay order. Please try again later.');
//         }
        

//          const booking = new this.bookingModel({
//              ...createBookingDto,
//              totalAmount: totalTicket,
//              gstAmount,
//              grandTotal,
//              razorpayOrderId: razorpayOrder.id, // Save Razorpay order ID if needed
//              discount: discountPercentage,
//              createdAt: new Date(),
//              updatedAt: new Date(),
//          });

//          console.log('Calculating Razorpay Order:');
//          console.log('Last Total (Rupees):', lastTotal);
//          console.log('GST Amount (Rupees):', gstAmount);
//          console.log('Grand Total (Rupees):', grandTotal);
//          console.log('Grand Total in Paise:', grandTotalInPaise);
         

//          console.log('Sending to Razorpay:', {
//             amount: grandTotalInPaise,
//             currency,
//         });
         

//         try {
//             return await booking.save(); // Awaiting save to handle potential errors
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to create booking. Please try again later.');
//         }
//     }

//     private async validateTicketAndStayCategories(ticketCategories: { ticketCategoryId: Types.ObjectId; quantity: number; price: number; }[], stayCategories: { stayCategoryId: Types.ObjectId; quantity: number; price: number; }[]) {
//         if (!ticketCategories || !Array.isArray(ticketCategories)) {
//             throw new BadRequestException('Ticket categories must be provided and must be an array.');
//         }
//         if (!stayCategories || !Array.isArray(stayCategories)) {
//             throw new BadRequestException('Stay categories must be provided and must be an array.');
//         }

//         const ticketIds = ticketCategories.map(item => item.ticketCategoryId);
//         const stayIds = stayCategories.map(item => item.stayCategoryId); // Ensure this is the correct key

//         const tickets = await this.ticketModel.find({ _id: { $in: ticketIds } });
//         const stays = await this.stayModel.find({ _id: { $in: stayIds } });

//         if (tickets.length !== ticketIds.length) {
//             throw new BadRequestException('One or more ticket categories are invalid.');
//         }
//         if (stays.length !== stayIds.length) {
//             throw new BadRequestException('One or more stay categories are invalid.');
//         }
//     }

//     private calculateTotalAmount(ticketCategories: { price: number; quantity: number; }[], stayCategories: { price: number; quantity: number; }[], discountPercentage: number): { total: number, totalTicket: number, totalStay: number } {
//         // Calculate ticket totals
//         const ticketTotal = ticketCategories.reduce((total, item) => total + (item.price * item.quantity), 0);

//         // Calculate stay totals
//         const stayTotal = stayCategories.reduce((total, item) => total + (item.price * item.quantity), 0);

//         // Apply discount only on ticket total
//         const discountedTicketTotal = ticketTotal - (ticketTotal * (discountPercentage / 100)); // Apply percentage discount

//         return {
//             total: discountedTicketTotal + stayTotal, // Total is discounted ticket total + stay total
//             totalTicket: discountedTicketTotal,
//             totalStay: stayTotal,
//         };
//     }

//     async findAll(): Promise<Booking[]> {
//         try {
//             const bookings = await this.bookingModel.find().exec();
//             if (!bookings || bookings.length === 0) {
//                 throw new BadRequestException('No bookings found.');
//             }
//             return bookings;
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to fetch bookings. Please try again later.');
//         }
//     }

//     async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<Booking> {
//         const booking = await this.bookingModel.findById(confirmPaymentDto.bookingId);
//         if (!booking) {
//             throw new BadRequestException('Booking not found.');
//         }
    
//         // Update payment status and payment ID in the booking document
//         booking.paymentStatus = true;
//         booking.razorpayPaymentId = confirmPaymentDto.paymentId; // Add this field to your Booking schema
    
//         try {
//             return await booking.save();
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to update payment status.');
//         }
//     }
    
    
// }


import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from './entities/booking.ticket.entity';
import { CreateBookingDto } from './dto/create-booking.ticket.dto';
import { Coupon } from '../coupon/entities/coupon.entity';
import { RazorpayService } from '../razorpay/razorpay.service';
import { ConfirmPaymentDto } from '../razorpay/dto/confirm-payment.dto';

@Injectable()
export class BookingService {
    private readonly GST_RATE = 0.18; // 18%

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
        @InjectModel('TicketCategory') private ticketModel: Model<any>,
        @InjectModel('StayCategory') private stayModel: Model<any>,
        private readonly razorpayService: RazorpayService,
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const today = new Date();
        const visitDate = new Date(createBookingDto.dateOfVisit);

        // Validate visit date
        if (visitDate < today) {
            throw new BadRequestException('Date of visit cannot be in the past.');
        }

        // Convert string IDs to ObjectId
        this.convertIdsToObjectId(createBookingDto);
        await this.validateTicketAndStayCategories(
            createBookingDto.ticketCategories,
            createBookingDto.stayCategories,
        );

        const discountPercentage = await this.getDiscountPercentage(createBookingDto.couponDiscountId);
        const { total, totalTicket, totalStay } = this.calculateTotalAmount(
            createBookingDto.ticketCategories,
            createBookingDto.stayCategories,
            discountPercentage,
        );

        const lastTotal = totalTicket + totalStay;
        const gstAmount = parseFloat((lastTotal * this.GST_RATE).toFixed(2)); // Ensure GST is calculated with precision
        const grandTotal = parseFloat((total + gstAmount).toFixed(2)); // Final grand total with precision
        
        console.log('Last Total (Rupees):', lastTotal);
        console.log('GST Amount (Rupees):', gstAmount);
        console.log('Grand Total (Rupees):', grandTotal);
        
        
        // Check if the amount exceeds Razorpay's limit
        const MAX_AMOUNT_PAISA = 100000000; // 1 crore in paise
        if (grandTotal > MAX_AMOUNT_PAISA) {
            console.error('Total amount exceeds Razorpay\'s maximum limit:', grandTotal);
            throw new BadRequestException('Total amount exceeds Razorpay\'s maximum limit.');
        }
        
        
        // Try to create Razorpay order
        let razorpayOrderId: string;
        try {
            const razorpayOrder = await this.razorpayService.createOrder(grandTotal, 'INR');
            razorpayOrderId = razorpayOrder.id;
            console.log('Razorpay Order ID:', razorpayOrderId); // Log the Razorpay order ID
        } catch (error) {
            console.error('Error during Razorpay order creation:', error);
            throw new InternalServerErrorException('Failed to create Razorpay order. Please try again later.');
        }
        
console.log('Razorpay Order ID:', razorpayOrderId);

        const booking = new this.bookingModel({
            ...createBookingDto,
            totalAmount: totalTicket,
            gstAmount,
            grandTotal,
            razorpayOrderId,
            discount: discountPercentage,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        try {
            return await booking.save();
        } catch (error) {
            console.error('Error saving booking:', error);
            throw new InternalServerErrorException('Failed to create booking. Please try again later.');
        }
    }

    private convertIdsToObjectId(createBookingDto: CreateBookingDto) {
        createBookingDto.ticketCategories = createBookingDto.ticketCategories.map(ticket => ({
            ticketCategoryId: new Types.ObjectId(ticket.ticketCategoryId),
            quantity: ticket.quantity,
            price: ticket.price,
        }));

        createBookingDto.stayCategories = createBookingDto.stayCategories.map(stay => ({
            stayCategoryId: new Types.ObjectId(stay.stayCategoryId),
            quantity: stay.quantity,
            price: stay.price,
        }));

        if (createBookingDto.couponDiscountId) {
            createBookingDto.couponDiscountId = new Types.ObjectId(createBookingDto.couponDiscountId);
        }
    }

    private async getDiscountPercentage(couponDiscountId: Types.ObjectId): Promise<number> {
        if (!couponDiscountId) return 0;

        const coupon = await this.couponModel.findById(couponDiscountId);
        if (!coupon) {
            throw new BadRequestException('Invalid coupon code.');
        }

        return coupon.discount; // Assuming discount is a percentage
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
        // Calculate ticket totals with rounding
        const ticketTotal = ticketCategories.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discountedTicketTotal = ticketTotal - (ticketTotal * (discountPercentage / 100));

        // Calculate stay totals with rounding
        const stayTotal = stayCategories.reduce((total, item) => total + (item.price * item.quantity), 0);

        const total = parseFloat((discountedTicketTotal + stayTotal).toFixed(2)); // Ensure precision here
        const totalTicket = parseFloat(discountedTicketTotal.toFixed(2));
        const totalStay = parseFloat(stayTotal.toFixed(2));

        return {
            total,
            totalTicket,
            totalStay,
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
            console.error('Error fetching bookings:', error);
            throw new InternalServerErrorException('Failed to fetch bookings. Please try again later.');
        }
    }

    async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<Booking> {
        const booking = await this.bookingModel.findById(confirmPaymentDto.bookingId);
        if (!booking) {
            throw new BadRequestException('Booking not found.');
        }

        // Update payment status and payment ID in the booking document
        booking.paymentStatus = true;
        booking.razorpayPaymentId = confirmPaymentDto.paymentId;

        try {
            return await booking.save();
        } catch (error) {
            console.error('Error updating payment status:', error);
            throw new InternalServerErrorException('Failed to update payment status.');
        }
    }
}

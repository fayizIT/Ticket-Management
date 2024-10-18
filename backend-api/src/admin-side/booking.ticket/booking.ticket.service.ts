// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Booking, BookingDocument } from './entities/booking.ticket.entity';
// import { TicketCategoryService } from '../ticket.category/ticket.category.service';
// import { StayCategoryService } from '../stay.category/stay.category.service';
// import { CouponService } from '../coupon/coupon.service'; 
// import { CreateBookingDto } from './dto/create-booking.ticket.dto';

// @Injectable()
// export class BookingTicketService {
//   private readonly GST_RATE = 0.18; // GST rate 18%

//   constructor(
//     @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
//     private readonly ticketCategoryService: TicketCategoryService,
//     private readonly stayCategoryService: StayCategoryService,
//     private readonly couponService: CouponService,
//   ) {}

//   async create(createBookingDto: CreateBookingDto): Promise<Booking> {
//     const { ticketCategories, stayCategories, couponCode } = createBookingDto;

//     // Validate ticket categories
//     for (const ticket of ticketCategories) {
//       const categoryExists = await this.ticketCategoryService.findOne(ticket.ticketCategoryId);
//       if (!categoryExists)
//         throw new BadRequestException('Invalid ticket category');
//     }

//     // Validate stay categories
//     for (const stay of stayCategories) {
//       const categoryExists = await this.stayCategoryService.findOne(stay.stayCategoryId);
//       if (!categoryExists)
//         throw new BadRequestException('Invalid stay category');
//     }

//     // Validate and apply coupon
//     let discount = 0;
//     if (couponCode) {
//       const coupon = await this.couponService.findOne(couponCode);
//       if (!coupon || !coupon.isActive)
//         throw new BadRequestException('Invalid or expired coupon');
//       discount = coupon.discount;
//     }

//     // Calculate total amount and GST
//     const ticketTotal = ticketCategories.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     );
//     const stayTotal = stayCategories.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     );
//     const totalAmountWithoutGST = ticketTotal + stayTotal;
//     const gstAmount = totalAmountWithoutGST * this.GST_RATE;
//     const totalAmountWithGST = totalAmountWithoutGST + gstAmount;

//     // Apply discount
//     const discountAmount = (totalAmountWithGST * discount) / 100;
//     const grandTotal = totalAmountWithGST - discountAmount;

//     // Create booking
//     const booking = new this.bookingModel({
//       ...createBookingDto,
//       totalAmount: totalAmountWithGST,
//       grandTotal,
//       gstAmount,
//       discount,
//     });

//     return booking.save();
//   }
// }


// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';


// import { Coupon } from 'src/admin-side/coupon/entities/coupon.entity';
// import { CreateBookingDto } from './dto/create-booking.ticket.dto';
// import { Booking, BookingDocument } from './entities/booking.ticket.entity';

// @Injectable()
// export class BookingService {
//     private readonly GST_RATE = 0.18; // 18%

//     constructor(
//         @InjectModel('Booking') private bookingModel: Model<BookingDocument>,
//         @InjectModel('Coupon') private couponModel: Model<Coupon>,
//         @InjectModel('TicketCategory') private ticketModel: Model<any>, // Adjust based on your TicketCategory entity
//         @InjectModel('StayCategory') private stayModel: Model<any>, // Adjust based on your StayCategory entity
//     ) {}

//     async create(createBookingDto: CreateBookingDto): Promise<Booking> {
//         // 1. Validate the date of visit
//         const today = new Date();
//         const visitDate = new Date(createBookingDto.dateOfVisit);
//         if (visitDate < today) {
//             throw new BadRequestException('Date of visit cannot be in the past.');
//         }

//         // 2. Validate Ticket and Stay IDs
//         await this.validateTicketAndStayCategories(createBookingDto.ticketCategories, createBookingDto.stayCategories);

//         // 3. Check if coupon is valid and apply discount if applicable
//         let discount = 0;
//         if (createBookingDto.couponDiscountId) {
//             const coupon = await this.couponModel.findById(createBookingDto.couponDiscountId);
//             if (!coupon) {
//                 throw new BadRequestException('Invalid coupon code.');
//             }
//             discount = coupon.discount; // Assuming discount is a percentage
//         }

//         // 4. Calculate totals
//         const totalAmountWithoutGST = this.calculateTotalAmount(createBookingDto.ticketCategories, createBookingDto.stayCategories, discount);

//         // 5. Calculate GST
//         const gstAmount = totalAmountWithoutGST * this.GST_RATE;

//         // 6. Calculate grand total
//         const grandTotal = totalAmountWithoutGST + gstAmount;

//         // 7. Create booking
//         const booking = new this.bookingModel({
//             ...createBookingDto,
//             totalAmount: totalAmountWithoutGST,
//             gstAmount,
//             grandTotal,
//             discount, // If you want to store the discount amount
//         });

//         return booking.save();
//     }

//     private async validateTicketAndStayCategories(ticketCategories: { ticketCategoryId: string; quantity: number; price: number; }[], stayCategories: { ageCategoryId: string; quantity: number; price: number; }[]) {
//         const ticketIds = ticketCategories.map(item => item.ticketCategoryId);
//         const stayIds = stayCategories.map(item => item.ageCategoryId);

//         const tickets = await this.ticketModel.find({ _id: { $in: ticketIds } });
//         const stays = await this.stayModel.find({ _id: { $in: stayIds } });

//         if (tickets.length !== ticketIds.length) {
//             throw new BadRequestException('One or more ticket categories are invalid.');
//         }
//         if (stays.length !== stayIds.length) {
//             throw new BadRequestException('One or more stay categories are invalid.');
//         }
//     }

//     private calculateTotalAmount(ticketCategories: { price: number; quantity: number; }[], stayCategories: { price: number; quantity: number; }[], discount: number): number {
//         const ticketTotal = ticketCategories.reduce((total, item) => total + (item.price * item.quantity), 0);
//         const stayTotal = stayCategories.reduce((total, item) => total + (item.price * item.quantity), 0);
        
//         const total = ticketTotal + stayTotal;

//         // Apply discount
//         return total - (total * (discount / 100)); // Assuming discount is a percentage
//     }
// }


import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './entities/booking.ticket.entity';
import { CreateBookingDto } from './dto/create-booking.ticket.dto';
import { Coupon } from '../coupon/entities/coupon.entity';
import { last } from 'rxjs';

@Injectable()
export class BookingService {
    private readonly GST_RATE = 0.18; // 18%

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
        @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
        @InjectModel('TicketCategory') private ticketModel: Model<any>, // Adjust based on your TicketCategory entity
        @InjectModel('StayCategory') private stayModel: Model<any>, // Adjust based on your StayCategory entity
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const today = new Date();
        const visitDate = new Date(createBookingDto.dateOfVisit);
        if (visitDate < today) {
            throw new BadRequestException('Date of visit cannot be in the past.');
        }

        await this.validateTicketAndStayCategories(createBookingDto.ticketCategories, createBookingDto.stayCategories);

        let discountPercentage = 0; // Changed to percentage
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
            discountPercentage
        );

        const lastTotal = totalTicket+totalStay;
        const gstAmount = lastTotal * this.GST_RATE; // GST only on ticket total
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

        return booking.save();
    }

    private async validateTicketAndStayCategories(ticketCategories: { ticketCategoryId: string; quantity: number; price: number; }[], stayCategories: { ageCategoryId: string; quantity: number; price: number; }[]) {
        const ticketIds = ticketCategories.map(item => item.ticketCategoryId);
        const stayIds = stayCategories.map(item => item.ageCategoryId);

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
            totalStay: stayTotal
        };
    }
    
}

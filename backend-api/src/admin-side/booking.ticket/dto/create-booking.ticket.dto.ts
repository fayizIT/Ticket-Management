import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    pinCode: string;

    @IsDateString()
    dateOfVisit: string;

    @IsNumber()
    @IsNotEmpty()
    totalVisitors: number;

    @IsArray()
    ticketCategories: {
        ticketCategoryId: Types.ObjectId; // Update to Types.ObjectId
        quantity: number;
        price: number;
    }[];

    @IsArray()
    stayCategories: {
        stayCategoryId: Types.ObjectId; // Update to Types.ObjectId
        quantity: number;
        price: number;
    }[];

    @IsString()
    @IsOptional()
    couponDiscountId?: Types.ObjectId; // Update to Types.ObjectId
}



import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

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
        ticketCategoryId: string;
        quantity: number;
        price: number;
    }[];

    @IsArray()
    stayCategories: {
        ageCategoryId: string;
        quantity: number;
        price: number;
    }[];

    @IsString()
    @IsOptional()
    couponDiscountId?: string; 
}


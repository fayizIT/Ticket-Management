import { IsNotEmpty, IsArray, IsString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  pinCode: string;

  @IsNotEmpty()
  @IsString() // Assuming date is in string format (e.g., "YYYY-MM-DD")
  dateOfVisit: string;

  @IsNotEmpty()
  @IsNumber()
  totalVisitors: number;

  @IsArray()
  @IsNotEmpty()
  ageCategories: {  // Keeping it as ageCategories to match entity
    ageCategoryId: string; 
    quantity: number; 
    price: number; // Include price if needed for the booking
  }[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  ticketGst: number;

  @IsNotEmpty()
  @IsNumber()
  grandTotal: number;
}

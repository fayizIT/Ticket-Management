// import { IsNotEmpty, IsArray, IsString, IsNumber, IsOptional } from 'class-validator';

// export class CreateBookingDto {
//   @IsNotEmpty()
//   @IsString()
//   fullName: string;

//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @IsNotEmpty()
//   @IsString()
//   email: string;

//   @IsNotEmpty()
//   @IsString()
//   pinCode: string;

//   @IsNotEmpty()
//   @IsString() // Assuming date is in string format (e.g., "YYYY-MM-DD")
//   dateOfVisit: string;

//   @IsNotEmpty()
//   @IsNumber()
//   totalVisitors: number;

//   @IsArray()
//   @IsNotEmpty()
//   ticketCategories: {
//     ticketCategoryId: string; 
//     quantity: number; 
//     price: number;
//   }[];

//   @IsArray()  // Add stayCategories similar to ticketCategories
//   @IsNotEmpty()
//   stayCategories: {
//     stayCategoryId: string;
//     quantity: number;
//     price: number;
//   }[];

//   @IsNotEmpty()
//   @IsNumber()
//   totalAmount: number;

//   @IsString()
//   @IsOptional()
//   couponCode: string

//   @IsNotEmpty()
//   @IsNumber()
//   ticketGst: number;

//   @IsNotEmpty()
//   @IsNumber()
//   grandTotal: number;
// }


// import { IsNotEmpty, IsArray, IsString, IsNumber, IsOptional } from 'class-validator';

// export class CreateBookingDto {
//   @IsNotEmpty()
//   @IsString()
//   fullName: string;

//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @IsNotEmpty()
//   @IsString()
//   email: string; // Add email to track user

//   @IsNotEmpty()
//   @IsString()
//   pinCode: string;

//   @IsNotEmpty()
//   @IsString() // Assuming date is in string format (e.g., "YYYY-MM-DD")
//   dateOfVisit: string;

//   @IsNotEmpty()
//   @IsNumber()
//   totalVisitors: number;

//   @IsArray()
//   @IsNotEmpty()
//   ticketCategories: {
//     ticketCategoryId: string; 
//     quantity: number; 
//     price: number;
//   }[];

//   @IsArray()  
//   @IsNotEmpty()
//   stayCategories: {
//     stayCategoryId: string; // Ensure the correct property name is used
//     quantity: number;
//     price: number;
//   }[];

//   @IsNotEmpty()
//   @IsNumber()
//   totalAmount: number;

//   @IsString()
//   @IsOptional()
//   couponCode: string;

//   @IsNotEmpty()
//   @IsNumber()
//   ticketGst: number;

//   @IsNotEmpty()
//   @IsNumber()
//   grandTotal: number;
// }



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
    couponDiscountId?: string; // Optional coupon discount ID
}


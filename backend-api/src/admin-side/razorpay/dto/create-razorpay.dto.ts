import { IsNumber, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateRazorpayOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1) // Ensure minimum amount is valid
    amount: number; // Amount in INR

    @IsOptional()
    @IsNotEmpty()
    currency?: string; // Default currency, e.g., 'INR'
}

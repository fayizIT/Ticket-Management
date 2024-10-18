import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTicketCategoryDto {
    @IsOptional()
    @IsString()
    name: string; 

    @IsOptional()
    @IsString()
    description: string; 

    @IsOptional()
    @IsNumber()
    price: number;
    

}
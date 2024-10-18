import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAgeCategoryDto {
    @IsOptional()
    @IsString()
    name: string; 

    @IsOptional()
    @IsString()
    description: string; 

    @IsOptional()
    @IsNumber()
    price: number;
    
    // @IsOptional()
    // @IsNumber()
    // discountedPrice: number;

}
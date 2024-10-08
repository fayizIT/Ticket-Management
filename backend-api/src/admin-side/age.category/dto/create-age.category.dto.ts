

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgeCategoryDto {
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

// import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

// export class CreateAgeCategoryDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @IsNumber()
//   @IsNotEmpty()
//   price: number;

//   @IsNumber()
//   @IsNotEmpty()
//   discountedPrice: number;
// }


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
    price: number; // Ensure this matches your property name

    @IsNotEmpty()
    @IsNumber()
    discountedPrice: number;
}

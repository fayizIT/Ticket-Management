import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsDate()
  expiryDate: Date;

  isActive?: boolean; // Optional field
}

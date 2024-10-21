import { IsString } from 'class-validator';

export class ConfirmPaymentDto {
    @IsString()
    bookingId: string;

    @IsString()
    paymentId: string;
}

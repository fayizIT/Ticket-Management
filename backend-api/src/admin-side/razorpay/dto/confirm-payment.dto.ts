import { IsNotEmpty } from 'class-validator';

export class ConfirmPaymentDto {
    @IsNotEmpty()
    bookingId: string;

    @IsNotEmpty()
    paymentId: string;
}

import { Body, Controller, Post } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { CreateRazorpayOrderDto } from './dto/create-razorpay.dto';

@Controller('razorpay')
export class RazorpayController {
    constructor(private readonly razorpayService: RazorpayService) {}

    @Post('create-bookedTicket')
    async createOrder(@Body() createRazorpayOrderDto: CreateRazorpayOrderDto) {
        const bookedTicket = await this.razorpayService.createOrder(createRazorpayOrderDto.amount, createRazorpayOrderDto.currency);
        return {
            id: bookedTicket.id,
            amount: bookedTicket.amount / 100, // Convert back to INR for response
            currency: bookedTicket.currency,
            receipt: bookedTicket.receipt,
        };
    }
}

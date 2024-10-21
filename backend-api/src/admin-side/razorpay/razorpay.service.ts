import { Injectable, InternalServerErrorException } from '@nestjs/common';
const Razorpay = require('razorpay');

@Injectable()
export class RazorpayService {
    private razorpay: any;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: 'rzp_test_vGGGd2XhY2l19v',
            key_secret: 'sZ1yJrVgiaoDcF7OVdqV7I5T',
        });
    }

    async createOrder(amount: number, currency: string = 'INR') {
        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency,
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        try {
            const order = await this.razorpay.orders.create(options);
            console.log('Razorpay Order Created:', order);
            return order;
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw new InternalServerErrorException('Failed to create order with Razorpay');
        }
    }
}

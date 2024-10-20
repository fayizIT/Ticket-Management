// import { Injectable } from '@nestjs/common';
// import Razorpay from 'razorpay';

// @Injectable()
// export class RazorpayService {
//     private razorpay: Razorpay;

//     constructor() {
//         this.razorpay = new Razorpay({
//             key_id: "rzp_test_vGGGd2XhY2l19v",
//             key_secret: "sZ1yJrVgiaoDcF7OVdqV7I5T",
//         });
//     }

//     async createOrder(amount: number, currency: string) {
//         const options = {
//             amount: amount * 100, // Amount is in paise
//             currency: currency,
//             receipt: `receipt_order_${new Date().getTime()}`,
//         };
//         return await this.razorpay.orders.create(options);
//     }

//     async confirmPayment(paymentId: string) {
//         // Here, you can verify the payment ID if needed
//         return { success: true, paymentId };
//     }
// }

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

    async createOrder(amount: number, currency: string = 'INR') { // Default currency to INR
        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency,
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        try {
            const order = await this.razorpay.orders.create(options);
            console.log('Razorpay Order Created:', order); // Log the created order
            return order;
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw new InternalServerErrorException('Failed to create order with Razorpay');
        }
    }
}

















// import { Injectable, BadRequestException } from '@nestjs/common';
// import Razorpay from 'razorpay'; 

// @Injectable()
// export class RazorpayService {
//     private razorpayInstance: Razorpay;

//     constructor() {
//         this.razorpayInstance = new Razorpay({
//                    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_vGGGd2XhY2l19v",
//             key_secret: process.env.RAZORPAY_KEY_SECRET || "sZ1yJrVgiaoDcF7OVdqV7I5T",
//         });
//     }

//     async createOrder(amount: number, currency: string) {
//         const options = {
//             amount: amount * 100, // Convert to smallest currency unit
//             currency: currency,
//             receipt: `receipt#${Math.random()}`, // Unique receipt identifier
//         };

//         try {
//             const order = await this.razorpayInstance.orders.create(options);
//             return order;
//         } catch (error) {
//             throw new BadRequestException('Failed to create Razorpay order.');
//         }
//     }
// }

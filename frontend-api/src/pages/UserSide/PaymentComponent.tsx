// src/components/PaymentComponent.tsx

import React, { useState } from 'react';
import { createRazorpayOrder } from '../../services/razorpayService'; 
import useRazorpay from '../../hooks/useRazorpay'; 

interface PaymentComponentProps {
    bookingId: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ bookingId }) => {
    const [amount, setAmount] = useState<number>(0);
    const [currency] = useState<string>('INR');

    useRazorpay();

    const handlePayment = async () => {
        try {
            const order = await createRazorpayOrder(amount, currency);
            const options = {
                key: 'rzp_test_vGGGd2XhY2l19v', // Your Razorpay key ID
                amount: order.amount, // Already in paise
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Booking Payment',
                order_id: order.id,
                handler: function (response: any) {
                    confirmPayment(response.razorpay_payment_id);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                notes: {
                    bookingId: bookingId,
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
        }
    };

    const confirmPayment = async (paymentId: string) => {
        try {
            const response = await fetch('http://localhost:3000/bookings/confirm-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, paymentId }),
            });

            if (!response.ok) {
                throw new Error('Payment confirmation failed');
            }

            alert('Payment confirmed successfully!');
        } catch (error) {
            console.error('Error confirming payment:', error);
            alert('Payment confirmation failed.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Payment</h2>
            <input
                type="number"
                className="border border-gray-300 p-2 mb-4"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button 
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentComponent;

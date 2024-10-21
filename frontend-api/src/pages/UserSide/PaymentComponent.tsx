import React, { useEffect, useState } from 'react';
import { createRazorpayOrder } from '../../services/razorpayService'; 
import useRazorpay from '../../hooks/useRazorpay'; 
import { useParams } from 'react-router-dom';

const PaymentComponent: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: any }>(); // Get bookingId from URL
    const [amount, setAmount] = useState<number>(0);
    const [currency] = useState<string>('INR');

    useRazorpay();

    // Fetch booking details including the amount
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/bookings/${bookingId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();
                setAmount(data.grandTotal); // Ensure your API returns a grandTotal field
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handlePayment = async () => {
        try {
            const order = await createRazorpayOrder(Math.round(amount * 100), currency); // Convert amount to paise
            console.log('Razorpay order created:', order); 
            const options = {
                key: 'rzp_test_vGGGd2XhY2l19v', 
                amount: order.amount,
                currency: order.currency,
                name: 'Canay',
                description: 'Booking Payment',
                order_id: order.id,
                handler: async function (response: any) {
                    await confirmPayment(bookingId, response.razorpay_payment_id); // Pass both bookingId and paymentId
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

    const confirmPayment = async (bookingId: string, paymentId: string) => {
        try {
            const response = await fetch('http://localhost:3000/bookings/confirm-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, paymentId }), // Ensure both IDs are included
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error response from server:', errorResponse);
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
                placeholder="Total Amount"
                value={amount}
                readOnly // Make it read-only since it's fetched from backend
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

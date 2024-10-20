// src/services/razorpayService.ts

const API_URL = 'http://localhost:3000/razorpay';

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
    const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
        throw new Error('Failed to create Razorpay order');
    }

    return await response.json();
};

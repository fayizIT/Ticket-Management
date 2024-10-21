// src/services/razorpayService.ts

// src/services/razorpayService.ts

const API_URL = 'http://localhost:3000/bookings'; // Update to point to the Razorpay controller

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
    const response = await fetch(`http://localhost:3000/bookings/confirm-payment`, { // Call the create-order endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }), // Send amount directly
    });

    if (!response.ok) {
        throw new Error('Failed to create Razorpay order');
    }

    return await response.json(); // Return the order details
};


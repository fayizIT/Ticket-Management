const API_URL = 'http://localhost:3000'; 

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
    try {
        const response = await fetch(`${API_URL}/bookings/confirm-payment`, { 
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
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error.message);
        throw new Error(error.message || 'An unexpected error occurred while creating Razorpay order.');
    }
};

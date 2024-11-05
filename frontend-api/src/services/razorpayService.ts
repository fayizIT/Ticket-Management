const API_URL = import.meta.env.VITE_API_URL; 

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


export const confirmPayment = async (bookingId:any) => {
    try {
      const response = await fetch(
        `http://localhost:3000/bookings/${bookingId}/confirm-payment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: true }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }
  
      return await response.json(); 
    } catch (error:any) {
      throw new Error(error.message); 
    }
  };




const API_URL = import.meta.env.VITE_API_URL;

export const otpservice = {
  sendOtp: async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/bookings/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to send OTP: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await fetch(`${API_URL}/bookings/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to verify OTP: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // throw new Error('An unexpected error occurred. Please try again later.');
    }
  },
};

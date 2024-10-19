// src/services/apiService.ts
const API_URL = 'http://localhost:3000/bookings'; // Replace with your backend URL

export const createBooking = async (bookingData: any) => {
  const response = await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  return await response.json();

}

  export const fetchBookings = async () => {
    const response = await fetch(API_URL);
  
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
  
    return await response.json();
  
};





















// // services/BookingService.js

// const API_BASE_URL = 'http://localhost:5000'; // Adjust based on your backend URL

// const BookingData ={
//     bookingId: '',
//     customerName: '',
//     email: '',
//     phoneNumber: '',
//     pincode: '',
//     dateOfVisit: '',
//     ticketCategories: [],
//     stayCategories: [],
//     couponDiscountId: '',
//     totalAmount: 0,
//     gstAmount: 0,
//     grandTotal: 0,
// }

// export const BookingService = {
//   // Create a new booking
//   async createBooking(bookingData: typeof BookingData) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/bookings`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create booking');
//       }

//       return await response.json(); // Return the new booking data
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error creating booking:', error.message);
//       } else {
//         console.error('Error creating booking:', String(error));
//       }
//       throw error;
//     }
//   },

//   // Fetch all bookings
//   async getAllBookings() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/bookings`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch bookings');
//       }

//       return await response.json(); // Return list of bookings
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error fetching bookings:', error.message);
//       } else {
//         console.error('Error fetching bookings:', String(error));
//       }
//       throw error;
//     }
//   }
// };

// services/BookingService.js

// bookingService.ts
// const API_URL = "http://localhost:3000/bookings"; // Replace with your API base URL

// // services/BookingService.ts

// class BookingService {
//     static async createBooking(bookingData: any) {
//       const response = await fetch('http://localhost:3000/bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to create booking');
//       }
  
//       return await response.json();
//     }
//   }
  
//   export default BookingService;
  

// export const submitBillingInfo = async (billingInfo: any) => {
//   try {
//     const response = await fetch(`${API_URL}/bookings`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(billingInfo),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to submit billing information");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error submitting billing info:", error);
//     throw error;
//   }
// };

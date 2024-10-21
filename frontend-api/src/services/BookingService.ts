const API_URL = "http://localhost:3000";

export const createBooking = async (bookingData: any) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error creating booking:", error.message);
    throw new Error(error.message || "An unexpected error occurred while creating booking.");
  }
};

export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`); // Assuming the bookings endpoint is /bookings

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching bookings:", error.message);
    throw new Error(error.message || "An unexpected error occurred while fetching bookings.");
  }
};

// src/redux/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  bookingData: any | null;
}

const initialState: BookingState = {
  bookingData: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<any>) => {
      state.bookingData = action.payload;
    },
    clearBookingData: (state) => {
      state.bookingData = null;
    },
  },
});

export const { setBookingData, clearBookingData } = bookingSlice.actions;
export const selectBookingData = (state: any) => state.booking.bookingData;
export default bookingSlice.reducer;

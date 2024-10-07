import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the date slice
interface DateState {
  selectedDate: Date | null;
}

const initialState: DateState = {
  selectedDate: null,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    // Action to set the selected date
    setSelectedDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;

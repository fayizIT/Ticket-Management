// src/redux/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
    selectedDate: string | null |any; // Change to string type
  }
  
const initialState: DateState = {
    selectedDate: null,
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
      setDate: (state, action: PayloadAction<string>) => {
        state.selectedDate = action.payload; // Store the ISO string directly
      },
    },
  });
  

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer; // This is what you're importing as dateReducer

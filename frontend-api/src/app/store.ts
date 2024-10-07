import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  selectedDate: string | null;
}

const initialState: DateState = {
  selectedDate: null,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
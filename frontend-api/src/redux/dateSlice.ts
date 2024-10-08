// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define the initial state for the date slice
// interface DateState {
//   selectedDate: Date | null;
// }

// const initialState: DateState = {
//   selectedDate: null,
// };

// const dateSlice = createSlice({
//   name: 'date',
//   initialState,
//   reducers: {
//     // Action to set the selected date
//     setSelectedDate(state, action: PayloadAction<Date>) {
//       state.selectedDate = action.payload;
//     },
//   },
// });

// export const { setSelectedDate } = dateSlice.actions;

// export default dateSlice.reducer;
// src/redux/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  selectedDate: Date | null; // Change to Date type
}
const initialState: DateState = {
    selectedDate: null,
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = new Date(action.payload);
        },
    },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer; // This is what you're importing as dateReducer

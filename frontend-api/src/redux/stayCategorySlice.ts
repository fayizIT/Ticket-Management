// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface StayCategory {
//     _id: string;
//     name: string;
//     price: number;
// }

// interface StayCategoryState {
//     categories: StayCategory[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: StayCategoryState = {
//     categories: [],
//     loading: false,
//     error: null,
// };

// export const fetchStayCategories = createAsyncThunk<StayCategory[]>('stayCategory/fetchStayCategories', async () => {
//     const response = await fetch("http://localhost:3000/admin/stay-categories");
//     if (!response.ok) {
//         throw new Error("Failed to fetch stay categories");
//     }
//     const data = await response.json();    
//     return data;
// });

// const stayCategorySlice = createSlice({
//     name: "stayCategory",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchStayCategories.pending, (state) => {
//                 state.loading = true;
//                 state.error = null; 
//             })
//             .addCase(fetchStayCategories.fulfilled, (state, action) => {
//                 state.categories = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchStayCategories.rejected, (state, action) => {
//                 state.error = action.error.message || "Unknown error";
//                 state.loading = false;
//             });
//     },
// });

// export default stayCategorySlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface StayCategory {
  _id: string; 
  name: string;
  price: number;
  description: string;
  image: string;
}

interface StayCategoryState {
  stayCategories: StayCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: StayCategoryState = {
  stayCategories: [],
  loading: false,
  error: null,
};

// Thunk to fetch stay categories
export const fetchStayCategories = createAsyncThunk(
  'stayCategory/fetchStayCategories',
  async () => {
    const response = await fetch('http://localhost:3000/admin/stay-categories');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Ensure the data returned is in the correct format
  }
);

const stayCategorySlice = createSlice({
  name: 'stayCategory',
  initialState,
  reducers: {
    incrementStay: (state, action: PayloadAction<string>) => {
      // Handle increment logic if needed
    },
    decrementStay: (state, action: PayloadAction<string>) => {
      // Handle decrement logic if needed
    },
    resetCart: (state) => {
      state.stayCategories = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStayCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStayCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.stayCategories = action.payload; // Ensure this is structured correctly
      })
      .addCase(fetchStayCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stay categories';
      });
  },
});

export const { incrementStay, decrementStay, resetCart } = stayCategorySlice.actions;
export default stayCategorySlice.reducer;


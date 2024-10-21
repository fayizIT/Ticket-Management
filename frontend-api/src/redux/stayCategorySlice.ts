import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface StayCategory {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface StayCategoryState {
  stayCategories: StayCategory[];
  total: number;
  tickets: Record<string, number>;

  loading: boolean;
  error: string | null;
}

const initialState: StayCategoryState = {
  stayCategories: [],
  total: 0,
  tickets: {},
  loading: false,
  error: null,
};

// Thunk to fetch stay categories
export const fetchStayCategories = createAsyncThunk(
  "stayCategory/fetchStayCategories",
  async () => {
    const response = await fetch("http://localhost:3000/admin/stay-categories");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Ensure the data returned is in the correct format
  }
);

const stayCategorySlice = createSlice({
  name: "stayCategory",
  initialState,
  reducers: {
    incrementStay: (state, action: PayloadAction<string>) => {
      const stayId = action.payload;
      state.tickets[stayId] = (state.tickets[stayId] || 0) + 1;
      // Update total price
      const stay = state.stayCategories.find((cat) => cat._id === stayId);
      if (stay) {
        state.total += stay.price;
      }
    },
    decrementStay: (state, action: PayloadAction<string>) => {
      const stayId = action.payload;
      if (state.tickets[stayId] > 0) {
        state.tickets[stayId] -= 1;
        // Update total price
        const stay = state.stayCategories.find((cat) => cat._id === stayId);
        if (stay) {
          state.total -= stay.price;
        }
      }
    },

    resetCart: (state) => {
      state.tickets = {};
      state.total = 0;
    },
    setStayCategories: (state, action: PayloadAction<StayCategory[]>) => {
      state.stayCategories = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStayCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStayCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.stayCategories = action.payload;
      })
      .addCase(fetchStayCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stay categories";
      });
  },
});

export const { incrementStay, decrementStay, resetCart } =
  stayCategorySlice.actions;
export default stayCategorySlice.reducer;

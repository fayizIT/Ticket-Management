import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = 'http://localhost:3000/admin/ticket-Category';

export const fetchTicketCategories = createAsyncThunk(
  'ticketCategory/fetchTicketCategories',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

interface TicketCategoryState {
  categories: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const ticketCategorySlice = createSlice({
  name: 'ticketCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTicketCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load ticket categories';
      });
  },
});

export default ticketCategorySlice.reducer;

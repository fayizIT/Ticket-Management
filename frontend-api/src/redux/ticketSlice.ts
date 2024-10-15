import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface TicketCategory {
  _id: string; // Assuming your categories use _id as a unique identifier
  name: string;
  price: number; // Include price for each ticket
}

interface TicketCategoryState {
  categories: TicketCategory[];
  tickets: Record<string, number>; // Store counts of each ticket type
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TicketCategoryState = {
  categories: [],
  tickets: {},
  total: 0,
  loading: false,
  error: null,
};

// Thunk to fetch ticket categories
export const fetchTicketCategories = createAsyncThunk(
  'ticketCategory/fetchTicketCategories',
  async () => {
    const response = await fetch('http://localhost:3000/admin/ticket-Category');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

const ticketCategorySlice = createSlice({
  name: 'ticketCategory',
  initialState,
  reducers: {
    incrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      state.tickets[ticketId] = (state.tickets[ticketId] || 0) + 1;
      // Update total price
      const ticket = state.categories.find(cat => cat._id === ticketId);
      if (ticket) {
        state.total += ticket.price;
      }
    },
    decrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      if (state.tickets[ticketId] > 0) {
        const ticket = state.categories.find(cat => cat._id === ticketId);
        if (ticket) {
          state.total -= ticket.price;
        }
        state.tickets[ticketId] -= 1;
      }
    },
    resetCart: (state) => {
      state.tickets = {};
      state.total = 0;
    },
    setCategories: (state, action: PayloadAction<TicketCategory[]>) => {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTicketCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ticket categories';
      });
  },
});

export const { incrementTicket, decrementTicket, resetCart, setCategories } = ticketCategorySlice.actions;
export default ticketCategorySlice.reducer;

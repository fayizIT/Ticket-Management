import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface TicketCategory {
  _id: string; // Unique identifier for the ticket category
  name: string;
  price: number; // Price for each ticket
}

interface TicketCategoryState {
  categories: TicketCategory[];
  tickets: Record<string, number>; // Counts of each ticket type
  totalticket: number;
  discountedTotal: number; // Total price after discount
  discount: number; // Discount percentage
  activeCoupon: string | null; // Currently applied coupon
  loading: boolean;
  error: string | null;
}

const initialState: TicketCategoryState = {
  categories: [],
  tickets: {},
  totalticket: 0,
  discountedTotal: 0,
  discount: 0,
  activeCoupon: null,
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

      // Update total ticket price
      const ticket = state.categories.find(cat => cat._id === ticketId);
      if (ticket) {
        state.totalticket += ticket.price;
        // Recalculate discounted total
        state.discountedTotal = Math.max(0, state.totalticket - (state.totalticket * (state.discount / 100)));
      }
    },
    decrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      if (state.tickets[ticketId] > 0) {
        const ticket = state.categories.find(cat => cat._id === ticketId);
        if (ticket) {
          state.totalticket -= ticket.price;
        }
        state.tickets[ticketId] -= 1;

        // Recalculate discounted total
        state.discountedTotal = Math.max(0, state.totalticket - (state.totalticket * (state.discount / 100)));
      }
    },
    applyDiscount: (state, action: PayloadAction<{ code: string; discountAmount: number }>) => {
      const { code, discountAmount } = action.payload;
      state.activeCoupon = code;
      state.discount = discountAmount;
      state.discountedTotal = Math.max(0, state.totalticket - (state.totalticket * (state.discount / 100)));
    },
    removeDiscount: (state) => {
      state.activeCoupon = null;
      state.discount = 0;
      state.discountedTotal = state.totalticket; // Reset to total price
    },
    resetCart: (state) => {
      state.tickets = {};
      state.totalticket = 0;
      state.discountedTotal = 0;
      state.discount = 0;
      state.activeCoupon = null; // Reset active coupon
    },
    setCategories: (state, action: PayloadAction<TicketCategory[]>) => {
      state.categories = action.payload;
    },
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

export const { 
  incrementTicket, 
  decrementTicket, 
  applyDiscount, 
  removeDiscount, 
  resetCart, 
  setCategories 
} = ticketCategorySlice.actions;

export default ticketCategorySlice.reducer;

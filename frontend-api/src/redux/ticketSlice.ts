import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a ticket category
interface TicketCategory {
  _id: string; // Unique identifier for the ticket category
  name: string;
  price: number; // Price for each ticket
}

// Define the structure of a coupon
interface Coupon {
  code: string; // Coupon code
  discount: number; // Discount percentage for this coupon
}

// Define the structure of the ticket category state
interface TicketCategoryState {
  categories: TicketCategory[]; // List of ticket categories
  tickets: Record<string, number>; // Counts of each ticket type
  total: number; // Total price before discount
  discountedTotal: number; // Total price after discount
  discount: number; // Discount percentage
  activeCoupon: Coupon | null; // Currently applied coupon
  loading: boolean; // Loading state for fetching categories
  error: string | null; // Error message, if any
}

const initialState: TicketCategoryState = {
  categories: [],
  tickets: {},
  total: 0,
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

// Thunk to fetch coupons
export const fetchCoupons = createAsyncThunk(
  'ticketCategory/fetchCoupons',
  async () => {
    const response = await fetch('http://localhost:3000/admin/coupons'); // Adjust the endpoint accordingly
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const coupons = await response.json();
    return coupons;
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
        state.total += ticket.price;
        // Recalculate discounted total
        state.discountedTotal = Math.max(0, state.total - (state.total * (state.discount / 100)));
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

        // Recalculate discounted total
        state.discountedTotal = Math.max(0, state.total - (state.total * (state.discount / 100)));
      }
    },
    applyDiscount: (state, action: PayloadAction<Coupon>) => {
      const coupon = action.payload;
      state.activeCoupon = coupon; // Set the active coupon
      state.discount = coupon.discount; // Set the discount percentage from the coupon
      // Update the discounted total
      state.discountedTotal = Math.max(0, state.total - (state.total * (state.discount / 100)));
    },
    removeDiscount: (state) => {
      state.activeCoupon = null; // Clear active coupon
      state.discount = 0; // Reset discount percentage
      state.discountedTotal = state.total; // Reset to total price
    },
    resetCart: (state) => {
      state.tickets = {};
      state.total = 0;
      state.discountedTotal = 0;
      state.discount = 0;
      state.activeCoupon = null; // Reset active coupon
    },
    setCategories: (state, action: PayloadAction<TicketCategory[]>) => {
      state.categories = action.payload; // Update categories
    },
    setCoupons: (state, action: PayloadAction<Coupon[]>) => {
      // Store coupons in the state if needed
      // You may want to update the state with the fetched coupons here
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketCategories.pending, (state) => {
        state.loading = true; // Set loading state
      })
      .addCase(fetchTicketCategories.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state
        state.categories = action.payload; // Set fetched categories
      })
      .addCase(fetchTicketCategories.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = action.error.message || 'Failed to fetch ticket categories'; // Set error message
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        // Handle the fetched coupons if needed
        // e.g., store them in state if you need to display available coupons
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch coupons'; // Set error message for coupons
      });
  },
});

// Export actions for use in components
export const { 
  incrementTicket, 
  decrementTicket, 
  applyDiscount, 
  removeDiscount, 
  resetCart, 
  setCategories, 
  setCoupons 
} = ticketCategorySlice.actions;

// Export the reducer to be used in the store
export default ticketCategorySlice.reducer;

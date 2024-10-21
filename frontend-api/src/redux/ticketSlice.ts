import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TicketCategory {
  _id: string;
  name: string;
  price: number;
}

interface Coupon {
  id: string;
  code: string;
  discount: number;
}

interface TicketCategoryState {
  categories: TicketCategory[];
  tickets: Record<string, number>;
  total: number;
  discountedTotal: number;
  discountAmount: number;
  discount: number;
  activeCoupon: Coupon | null;
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketCategoryState = {
  categories: [],
  tickets: {},
  total: 0,
  discountedTotal: 0,
  discountAmount: 0,
  discount: 0,
  activeCoupon: null,
  coupons: [],
  loading: false,
  error: null,
};

// Thunk to fetch ticket categories
export const fetchTicketCategories = createAsyncThunk(
  "ticketCategory/fetchTicketCategories",
  async () => {
    const response = await fetch("http://localhost:3000/admin/ticket-Category");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

// Thunk to fetch coupons
export const fetchCoupons = createAsyncThunk(
  "ticketCategory/fetchCoupons",
  async () => {
    const response = await fetch("http://localhost:3000/admin/coupons");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const coupons = await response.json();

    // Map the coupons to include the ID
    return coupons.map((coupon: any) => ({
      id: coupon._id.$oid,
      code: coupon.code,
      discount: coupon.discount,
    }));
  }
);

const ticketCategorySlice = createSlice({
  name: "ticketCategory",
  initialState,
  reducers: {
    incrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      state.tickets[ticketId] = (state.tickets[ticketId] || 0) + 1;
      const ticket = state.categories.find((cat) => cat._id === ticketId);
      if (ticket) {
        state.total += ticket.price;
        state.discountedTotal = Math.max(
          0,
          state.total - state.total * (state.discount / 100)
        );
      }
    },
    decrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      if (state.tickets[ticketId] > 0) {
        const ticket = state.categories.find((cat) => cat._id === ticketId);
        if (ticket) {
          state.total -= ticket.price;
        }
        state.tickets[ticketId] -= 1;
        state.discountedTotal = Math.max(
          0,
          state.total - state.total * (state.discount / 100)
        );
      }
    },
    applyDiscount: (
      state,
      action: PayloadAction<{ id: any; code: string; discount: number }>
    ) => {
      const total = state.categories.reduce(
        (sum, category) =>
          sum + category.price * (state.tickets[category._id] || 0),
        0
      );
      const discountAmount = total * (action.payload.discount / 100);
      state.discountedTotal = total - discountAmount;
      state.discountAmount = discountAmount;
      state.activeCoupon = {
        code: action.payload.code,
        discount: action.payload.discount,
        id: action.payload.id,
      };
    },
    removeDiscount: (state) => {
      state.discountedTotal = state.total;
      state.discountAmount = 0;
      state.activeCoupon = null;
    },
    resetCart: (state) => {
      state.tickets = {};
      state.total = 0;
      state.discountedTotal = 0;
      state.discount = 0;
      state.activeCoupon = null;
    },
    setCategories: (state, action: PayloadAction<TicketCategory[]>) => {
      state.categories = action.payload;
    },
    setCoupons: (state, action: PayloadAction<Coupon[]>) => {
      state.coupons = action.payload;
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
        state.error =
          action.error.message || "Failed to fetch ticket categories";
      })
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coupons";
      });
  },
});

export const selectTicketQuantity = (ticketId: string) => (state: any) =>
  state.ticketCategory?.tickets?.[ticketId] || 0;

export const {
  incrementTicket,
  decrementTicket,
  applyDiscount,
  removeDiscount,
  resetCart,
  setCategories,
  setCoupons,
} = ticketCategorySlice.actions;

export default ticketCategorySlice.reducer;

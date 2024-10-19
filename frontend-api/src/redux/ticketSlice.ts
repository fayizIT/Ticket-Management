import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TicketCategory {
  _id: string;
  name: string;
  price: number;
}

// Define the structure of a coupon
interface Coupon {
  id: string; // MongoDB Object ID
  code: string;
  discount: number;
}

// Define the structure of the ticket category state
interface TicketCategoryState {
  categories: TicketCategory[];
  tickets: Record<string, number>;
  total: number;
  discountedTotal: number;
  discountAmount: number;
  discount: number;
  activeCoupon: Coupon | null;
  coupons: Coupon[]; // Added this line
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
  coupons: [], // Initialize as an empty array
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
      id: coupon._id.$oid, // Assuming your response structure
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
      action: PayloadAction<{id:any, code: string; discount: number }>
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
        id: action.payload.id, // Make sure to set the ID here
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
      state.coupons = action.payload; // Store coupons in the state
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
        state.coupons = action.payload; // Store coupons in state
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

// Export the reducer to be used in the store
export default ticketCategorySlice.reducer;










































// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "@reduxjs/toolkit/query";
// interface TicketCategory {
//   _id: string;
//   name: string;
//   price: number;
// }

// // Define the structure of a coupon
// interface Coupon {
//   code: string;
//   discount: number;
// }

// // Define the structure of the ticket category state
// interface TicketCategoryState {
//   categories: TicketCategory[];
//   tickets: Record<string, number>;
//   total: number;
//   discountedTotal: number;
//   discountAmount: number;
//   discount: number;
//   activeCoupon: Coupon | null;
//   currentCoupon: Coupon | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TicketCategoryState = {
//   categories: [],
//   tickets: {},
//   total: 0,
//   discountedTotal: 0,
//   discountAmount: 0,
//   discount: 0,
//   activeCoupon: null,
//   currentCoupon: null,
//   loading: false,
//   error: null,
// };

// // Thunk to fetch ticket categories
// export const fetchTicketCategories = createAsyncThunk(
//   "ticketCategory/fetchTicketCategories",
//   async () => {
//     const response = await fetch("http://localhost:3000/admin/ticket-Category");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   }
// );

// // Thunk to fetch coupons
// export const fetchCoupons = createAsyncThunk(
//   "ticketCategory/fetchCoupons",
//   async () => {
//     const response = await fetch("http://localhost:3000/admin/coupons"); // Adjust the endpoint accordingly
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const coupons = await response.json();
//     return coupons;
//   }
// );

// const ticketCategorySlice = createSlice({
//   name: "ticketCategory",
//   initialState,
//   reducers: {
//     incrementTicket: (state, action: PayloadAction<string>) => {
//       const ticketId = action.payload;
//       state.tickets[ticketId] = (state.tickets[ticketId] || 0) + 1;
//       // Update total ticket price
//       const ticket = state.categories.find((cat) => cat._id === ticketId);
//       if (ticket) {
//         state.total += ticket.price;
//         // Recalculate discounted total
//         state.discountedTotal = Math.max(
//           0,
//           state.total - state.total * (state.discount / 100)
//         );
//       }
//     },
//     decrementTicket: (state, action: PayloadAction<string>) => {
//       const ticketId = action.payload;
//       if (state.tickets[ticketId] > 0) {
//         const ticket = state.categories.find((cat) => cat._id === ticketId);
//         if (ticket) {
//           state.total -= ticket.price;
//         }
//         state.tickets[ticketId] -= 1;

//         // Recalculate discounted total
//         state.discountedTotal = Math.max(
//           0,
//           state.total - state.total * (state.discount / 100)
//         );
//       }
//     },
//     applyDiscount: (
//       state,
//       action: PayloadAction<{ code: string; discount: number }>
//     ) => {
//       const total = state.categories.reduce(
//         (sum, category) =>
//           sum + category.price * (state.tickets[category._id] || 0),
//         0
//       );
//       const discountAmount = total * (action.payload.discount / 100); // Calculate the discount amount
//       state.discountedTotal = total - discountAmount; // Subtract the discount from total
//       state.discountAmount = discountAmount; // Store the discount amount
//       state.activeCoupon = {
//         code: action.payload.code,
//         discount: action.payload.discount,
//       };
//       state.currentCoupon = {
//         code: action.payload.code,
//         discount: action.payload.discount,
//       }; // Updated
//     },
//     removeDiscount: (state) => {
//       state.discountedTotal = state.total; // Reset to total
//       state.discountAmount = 0; // Clear the discount
//       state.activeCoupon = null; // Clear active coupon
//       state.currentCoupon = null; // Clear active coupon (renamed)
//     },
//     resetCart: (state) => {
//       state.tickets = {};
//       state.total = 0;
//       state.discountedTotal = 0;
//       state.discount = 0;
//       state.activeCoupon = null; // Reset active coupon
//       state.currentCoupon = null; // Reset active coupon (renamed)
//     },
//     setCategories: (state, action: PayloadAction<TicketCategory[]>) => {
//       state.categories = action.payload; // Update categories
//     },
//     setCoupons: (state, action: PayloadAction<Coupon[]>) => {
//       // Store coupons in the state if needed
//       // You may want to update the state with the fetched coupons here
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTicketCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTicketCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchTicketCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.error.message || "Failed to fetch ticket categories";
//       })
//       .addCase(fetchCoupons.rejected, (state, action) => {
//         state.error = action.error.message || "Failed to fetch coupons";
//       });
//   },
// });


// export const selectTicketQuantity = (ticketId: string) => (state: any) => 
//   state.ticketCategory?.tickets?.[ticketId] || 0;
// export const {
//   incrementTicket,
//   decrementTicket,
//   applyDiscount,
//   removeDiscount,
//   resetCart,
//   setCategories,
//   setCoupons,
// } = ticketCategorySlice.actions;

// // Export the reducer to be used in the store
// export default ticketCategorySlice.reducer;





import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface TicketCategory {
  _id: string;
  name: string;
  price: number;
}

// Define the structure of a coupon
interface Coupon {
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
  currentCoupon: Coupon | null;
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
  currentCoupon: null,
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
    const response = await fetch("http://localhost:3000/admin/coupons"); // Adjust the endpoint accordingly
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const coupons = await response.json();
    return coupons;
  }
);

const ticketCategorySlice = createSlice({
  name: "ticketCategory",
  initialState,
  reducers: {
    incrementTicket: (state, action: PayloadAction<string>) => {
      const ticketId = action.payload;
      state.tickets[ticketId] = (state.tickets[ticketId] || 0) + 1;

      // Update total ticket price
      const ticket = state.categories.find((cat) => cat._id === ticketId);
      if (ticket) {
        state.total += ticket.price;
        // Recalculate discounted total
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

        // Recalculate discounted total
        state.discountedTotal = Math.max(
          0,
          state.total - state.total * (state.discount / 100)
        );
      }
    },
    applyDiscount: (
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) => {
      const total = state.categories.reduce(
        (sum, category) =>
          sum + category.price * (state.tickets[category._id] || 0),
        0
      );
      const discountAmount = total * (action.payload.discount / 100); // Calculate the discount amount
      state.discountedTotal = total - discountAmount; // Subtract the discount from total
      state.discountAmount = discountAmount; // Store the discount amount
      state.activeCoupon = {
        code: action.payload.code,
        discount: action.payload.discount,
      };
      state.currentCoupon = {
        code: action.payload.code,
        discount: action.payload.discount,
      }; // Updated
    },
    removeDiscount: (state) => {
      state.discountedTotal = state.total; // Reset to total
      state.discountAmount = 0; // Clear the discount
      state.activeCoupon = null; // Clear active coupon
      state.currentCoupon = null; // Clear active coupon (renamed)
    },
    resetCart: (state) => {
      state.tickets = {};
      state.total = 0;
      state.discountedTotal = 0;
      state.discount = 0;
      state.activeCoupon = null; // Reset active coupon
      state.currentCoupon = null; // Reset active coupon (renamed)
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
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch coupons";
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
  setCoupons,
} = ticketCategorySlice.actions;

// Export the reducer to be used in the store
export default ticketCategorySlice.reducer;



// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// interface TicketCategory {
//   _id: string;
//   name: string;
//   price: number;
// }

// // Define the structure of a coupon
// interface Coupon {
//   id: string; // Assuming coupon ID is a string
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
//   couponId: string | null; // Store coupon ID here
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
//   couponId: null, // Initialize couponId to null
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
//       action: PayloadAction<{ id: string; code: string; discount: number }>
//     ) => {
//       const total = state.categories.reduce(
//         (sum, category) =>
//           sum + category.price * (state.tickets[category._id] || 0),
//         0
//       );
//       const discountAmount = total * (action.payload.discount / 100); // Calculate the discount amount
//       state.discountedTotal = total - discountAmount; // Subtract the discount from total
//       state.discountAmount = discountAmount; // Store the discount amount

//       // Update active and current coupon details
//       state.activeCoupon = {
//         id: action.payload.id, // Store the coupon ID
//         code: action.payload.code,
//         discount: action.payload.discount,
//       };
//       state.currentCoupon = {
//         id: action.payload.id, // Store the coupon ID
//         code: action.payload.code,
//         discount: action.payload.discount,
//       };

//       // Set the couponId in state
//       state.couponId = action.payload.id; // Store the coupon ID in the state
//     },
//     removeDiscount: (state) => {
//       state.discountedTotal = state.total; // Reset to total
//       state.discountAmount = 0; // Clear the discount
//       state.activeCoupon = null; // Clear active coupon
//       state.currentCoupon = null; // Clear active coupon (renamed)
//       state.couponId = null; // Clear coupon ID
//     },
//     resetCart: (state) => {
//       state.tickets = {};
//       state.total = 0;
//       state.discountedTotal = 0;
//       state.discount = 0;
//       state.activeCoupon = null; // Reset active coupon
//       state.currentCoupon = null; // Reset active coupon (renamed)
//       state.couponId = null; // Reset coupon ID
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

// // Export actions for use in components
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

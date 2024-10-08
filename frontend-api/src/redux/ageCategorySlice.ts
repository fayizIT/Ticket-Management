// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAgeCategories } from '../services/Users/ageCategoryService'; 

// interface AgeCategory {
//   id: string;
//   name: string;
//   price: number;
//   discount?: number;
// }

// interface AgeCategoryState {
//   categories: AgeCategory[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AgeCategoryState = {
//   categories: [],
//   loading: false,
//   error: null,
// };

// // Async action to fetch age categories
// export const fetchAgeCategories = createAsyncThunk('ageCategory/fetchAll', async () => {
//   const response = await getAgeCategories();
//   return response;
// });

// const ageCategorySlice = createSlice({
//   name: 'ageCategory',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAgeCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAgeCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchAgeCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch categories';
//       });
//   },
// });

// export default ageCategorySlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your actual API URL
const API_URL = 'http://localhost:3000/admin/age-categories';

export const fetchAgeCategories = createAsyncThunk(
    'ageCategory/fetchAgeCategories',
    async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
);

interface AgeCategoryState {
    categories: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AgeCategoryState = {
    categories: [],
    loading: false,
    error: null,
};

const ageCategorySlice = createSlice({
    name: 'ageCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgeCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAgeCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAgeCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load age categories';
            });
    },
});

export default ageCategorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface StayCategory {
    _id: string;
    name: string;
    price: number;
}

interface StayCategoryState {
    categories: StayCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: StayCategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchStayCategories = createAsyncThunk<StayCategory[]>('stayCategory/fetchStayCategories', async () => {
    const response = await fetch("http://localhost:3000/admin/stay-categories");
    if (!response.ok) {
        throw new Error("Failed to fetch stay categories");
    }
    const data = await response.json();    
    return data;
});

const stayCategorySlice = createSlice({
    name: "stayCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStayCategories.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchStayCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchStayCategories.rejected, (state, action) => {
                state.error = action.error.message || "Unknown error";
                state.loading = false;
            });
    },
});

export default stayCategorySlice.reducer;

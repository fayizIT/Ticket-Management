// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './redux/dateSlice'; // Import the date reducer
import ageCategoryReducer from './redux/ticketSlice'; // Import the age category reducer

const store = configureStore({
    reducer: {
        date: dateReducer, // Add the date reducer to the store
        ageCategory: ageCategoryReducer, // Add the age category reducer to the store
    },
});

export default store;

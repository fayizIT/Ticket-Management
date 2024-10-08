// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../redux/dateSlice';
import ageCategoryReducer from '../redux/ageCategorySlice';
const store = configureStore({
    reducer: {
        date: dateReducer, 
        ageCategory: ageCategoryReducer,
    },
});

export default store;

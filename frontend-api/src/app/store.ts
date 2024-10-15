// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../redux/dateSlice';
import ageCategoryReducer from '../redux/tickectSlice';
import stayCategoryReducer from '../redux/stayCategorySlice'
const store = configureStore({
    reducer: {
        date: dateReducer, 
        ageCategory: ageCategoryReducer,
        stayCategory: stayCategoryReducer,
    },  
    
});

export default store;

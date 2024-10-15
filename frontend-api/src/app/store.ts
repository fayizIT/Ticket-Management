// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../redux/dateSlice';
import ticketCategoryReducer from '../redux/tickectSlice';
import stayCategoryReducer from '../redux/stayCategorySlice'
const store = configureStore({
    reducer: {
        date: dateReducer, 
        ticketCategory: ticketCategoryReducer,
        stayCategory: stayCategoryReducer,
    },  
    
});

export default store;

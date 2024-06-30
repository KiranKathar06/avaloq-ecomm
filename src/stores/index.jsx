import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartstore';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // user: ...
    }
})
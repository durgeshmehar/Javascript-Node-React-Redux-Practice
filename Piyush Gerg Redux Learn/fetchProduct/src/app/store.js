import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/cartSlice.js";

export const store = configureStore({
   reducer:{
        cart:cartReducer
   }
})
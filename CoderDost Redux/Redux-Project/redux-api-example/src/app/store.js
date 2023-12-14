import { configureStore } from '@reduxjs/toolkit';
import productsSliceReducer from '../features/product/productsSlice';
import cartSliceReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    product: productsSliceReducer,
	cart: cartSliceReducer,
  },
});

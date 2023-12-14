import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchItems ,addItem ,updateItem ,deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'product/fetchItems',
    async () => {
    const response = await fetchItems();
    return response.data;
  }
);
export const addAsync = createAsyncThunk(
  'product/addItem',
    async (item) => {
	const {id,title, thumbnail, price,brand } = item;
    const response = await addItem({id,title, thumbnail, price,brand ,quantity:1});
    return response.data;
  }
);
export const deleteAsync = createAsyncThunk(
  'product/deleteItem',
    async (itemId) => {
		await deleteItem(itemId);
		
    return itemId;
  }
);
export const updateAsync = createAsyncThunk(
  'product/updateItem',
    async ({Id , change}) => {
	   const response =	await updateItem(Id ,change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const findIndex = state.items.findIndex((item)=>item.id === action.payload);
		state.items.splice(findIndex ,1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id === action.payload.id);
		state.items.splice(index ,1, action.payload);
      })
  },
});

// export const {  } = cartSlice.actions;
export default cartSlice.reducer;

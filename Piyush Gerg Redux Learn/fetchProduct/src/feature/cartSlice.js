import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk('cart/fetchProduct', async() => {
    const response = await fetch('https://dummyjson.com/products');
    return response.json();
})

const cartSlice = createSlice({
    name:'cart',
    initialState : { isLoading:false,data:null ,isError:false,},
     reducers:{
        addItem :(state,action) => {
            state.data.products.push(action.payload)
        },
     },
     extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,  (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProduct.fulfilled,  (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        })
        builder.addCase(fetchProduct.rejected,  (state) => {
            state.isError = true;
        })
     }
});

export const {addItem} = cartSlice.actions;
export default cartSlice.reducer;
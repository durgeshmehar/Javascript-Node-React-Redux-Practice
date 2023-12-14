import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
   amount: 10,
}
export const getUserAccount = createAsyncThunk(
	'account/getUser',
	async (userId) => {
	const {data} =  await axios.get(`http://localhost:3000/accounts/${userId}`);
	return  data.amount;
	}
  )

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1
    },
    decrement: (state) => {
      state.amount -= 1
    },
    incrementByAmount: (state, action) => {
      state.amount += action.payload
    },
   },
   extraReducers:(builder)=>{
	builder.addCase( getUserAccount.fulfilled, (state,action)=>{
		state.amount = action.payload;
		state.pending=false;
	})
	.addCase( getUserAccount.rejected, (state,action)=>{
		state.pending=false;
		state.error = action.error;
	})
	.addCase( getUserAccount.pending, (state)=>{
       state.pending=true;
	})
  }
})


export const { increment, decrement, incrementByAmount } = accountSlice.actions

export default accountSlice.reducer
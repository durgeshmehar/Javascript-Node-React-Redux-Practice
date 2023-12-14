/* eslint-disable react/prop-types */

import { useState } from 'react';
import {useSelector ,useDispatch} from 'react-redux';
import { increment, decrement, incrementByAmount,getUserAccount } from "../slices/accountSlice";



function Accounts() {
	const [value, setValue] = useState(0);
	const amount =  useSelector(state => state.account.amount);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch( incrementByAmount(value));
		setValue(0);
	}

	return ( 
		<>
			<h2 className='head-color'>Account Component</h2>
			<h3 className="subhead-color"> Amount :${amount} </h3>

			<div className="buttonsList">
				<button className="btn" onClick={()=>{dispatch(increment())}}> Increment +</button>
				<button className="btn" onClick={ ()=>{ dispatch(decrement()) } }>Decrement -</button>

				<input type="text" value={value} placeholder="Enter Increment Value" onChange={(e)=>{setValue(+e.target.value)}} />

				<button className="btn" onClick={handleSubmit} > Increment By {value}+  </button>
				<button className="btn" onClick={() => {
		dispatch(getUserAccount(1)) }} > Get User+ </button>
				
			</div>
		</>
	);
}

export default Accounts;

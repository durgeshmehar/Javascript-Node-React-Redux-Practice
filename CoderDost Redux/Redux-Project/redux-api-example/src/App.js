import React, { useState ,useEffect } from 'react';
import { fetchAsync} from './features/cart/cartSlice'
import './App.css';
import Products from './features/product/Products';
import Cart from './features/cart/Cart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



function App() {
	const[show ,setshow] =useState(false);
	const items = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAsync());
	}, [dispatch])

  return (
    <div className="App">
	     <button className='cartbtn' onClick={()=>{setshow(!show)}}> {!show ?`Cart (${items.length})`:`Products (30)`}</button>
	     {show?<Cart />:<Products /> }
    </div>
  );
}

export default App;

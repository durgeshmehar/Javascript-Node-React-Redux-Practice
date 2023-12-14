import { useDispatch, useSelector } from 'react-redux';
import './Cart.css'
import {deleteAsync ,updateAsync} from './cartSlice';

function Products() {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);

	const handleChange = (e, id) => {
		dispatch(updateAsync({Id:id, change: { quantity: +e.target.value } }));
	};

	const total = items.reduce((acc, item) => item.price * item.quantity + acc, 0);

	return (
		<>
			<h1>Shopping Cart</h1>
			<div className="row">
				{items && items.map((item) => (
					<div key={item.id} className="cart-item">
						<img src={item.thumbnail} alt={item.title} className="cart-item-image" />
						<div className="cart-item-details">
							<h3 className="cart-item-title">{item.title}</h3>
							<p className="cart-item-brand">{item.brand}</p>
							<p className="cart-item-brand">${item.price}</p>
							<div className="cart-item-quantity">
								<label htmlFor="quantity">Quantity:</label>
								<select id="quantity" name="quantity" value={item.quantity} onChange={(e)=>{ handleChange(e,item.id) }}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</select>
							</div>
							<button onClick={()=>{ dispatch(deleteAsync(item.id)) }} className="cart-item-remove"> Remove </button>
						</div>
					</div>
				))}
			</div>
			<h1>Total : {total}</h1>
		</>
	);
}

			export default Products;

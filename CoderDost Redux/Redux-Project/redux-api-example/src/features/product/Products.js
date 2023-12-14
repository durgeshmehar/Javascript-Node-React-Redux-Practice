import { fetchAsync }from './productsSlice'
import { useDispatch ,useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Product.css'
import { addAsync } from '../cart/cartSlice';

function Products() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		dispatch(fetchAsync());
	}, [])

	return (
			<div >
                <div className="row">
					{products && products.map((product) => (
					 <div key={product.id} className="card">
						<img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
						<h1>{product.title}</h1>
						<p className="price">${product.price} </p>
						<p>{product.description} </p>
						<p>
							<button onClick={()=>dispatch(addAsync(product))}>Add to Cart</button>
						</p>
					 </div>
				))}
				</div>
			</div>
	);
}

export default Products;

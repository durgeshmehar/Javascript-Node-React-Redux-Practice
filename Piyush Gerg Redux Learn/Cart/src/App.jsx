import './App.css'
import data from "../product.json"
import Product from "./component/Product"
import Cart from "./component/Cart"

function App() {

  return(
    <>
      <Cart />
      <div style={{display:'flex' ,flexDirection:'row',flexWrap:'wrap' ,gap:'80px 20px'}}>
      {data.products.map(product=>(
        <Product key={product.id} name={product.title} imgSrc={product.thumbnail} price={product.price} />
        ))}
      </div>
    </>
  )
}

export default App;

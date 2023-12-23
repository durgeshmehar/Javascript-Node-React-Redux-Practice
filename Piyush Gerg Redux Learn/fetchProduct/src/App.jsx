import "./App.css";
import Cart from "./component/Cart";
import Product from "./component/Product";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  console.log("state :", state);

  const data = state.cart.data;

  return (
    <>
      <Cart />
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "80px 20px",
      }}>
        {state.cart.isLoading ? (
          <h1 style={{color:'blue'}}>Loading...</h1>
        ) : (
          data &&
          data.products &&
          data.products.map((product) => (
            <Product
              key={product.id}
              name={product.title}
              imgSrc={product.thumbnail}
              price={product.price}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;

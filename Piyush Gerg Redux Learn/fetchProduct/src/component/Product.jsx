import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addItem } from '../feature/cartSlice';

function Product({name, imgSrc, price }) {
    const dispatch = useDispatch();
    return (
        <>
            <div style={{border:'1px solid gray', borderRadius: "5%", width: "19rem", height: "23rem", margin: "10px" }}>
                <img src={imgSrc} style={{ width: "19rem",height:'14rem',marginBottom:"1vw" }} />
                <div style={{display:"flex" ,flexDirection:"column",alignItems:'flex-start'}}>
                  <h2 style={{margin:'0',padding:'4px'}}>{name}</h2>
                  <h3 style={{margin:'0',padding:'4px'}}>{price}$</h3>
                  <button style={{padding:"1vw",outline:'none',border:'none',cursor:'pointer', borderRadius: "5%" ,backgroundColor:"blue" ,color:'white',alignSelf:'center',justifySelf:'end'}} onClick={()=>{ dispatch(addItem({name:name,price:price}))}}>Add to Cart</button>
                </div>
            </div>
        </>
    );
}

Product.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Product;

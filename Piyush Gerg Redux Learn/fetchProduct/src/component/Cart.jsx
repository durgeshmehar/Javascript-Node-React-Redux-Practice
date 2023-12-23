import { useSelector,useDispatch } from "react-redux"
import { fetchProduct } from "../feature/cartSlice"

function Counter() {
  const dataObject = useSelector((state)=>state)
  const dispatch = useDispatch()
  const total = dataObject?.cart?.data?.products?.reduce((a,b) => a+b.price,0)

  return (
    <div style={{position:'sticky',top: 0 ,margin:'0',padding:'2vw',backgroundColor:'limegreen' ,color:'purple'}}>
      <button style={{padding:"1vw",margin:'0 0 10px 0',outline:'none',border:'none',cursor:'pointer', borderRadius: "5%" ,backgroundColor:'red' ,color:'white',alignSelf:'center',justifySelf:'end',fontSize:'large'}} onClick={()=>{ dispatch(fetchProduct())}}> Fetch Products</button>

      <h1>Total Items :{dataObject?.cart?.data?.products?.length} ( ${total} )</h1>
    </div>
  )
}

export default Counter
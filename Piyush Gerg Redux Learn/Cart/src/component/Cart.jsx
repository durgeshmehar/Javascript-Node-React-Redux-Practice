import { useSelector } from "react-redux"

function Counter() {
  const data = useSelector((state)=>state)
  console.log("DATA :" ,data)
  const total = data.cart.reduce((a,b) => a+b.price,0)

  return (
    <div style={{position:'sticky',top: 0 ,margin:'0',padding:'2vw',backgroundColor:'limegreen' ,color:'purple'}}>
      <h1>Total Items :{data.cart.length} ( ${total} )</h1>
    </div>
  )
}

export default Counter
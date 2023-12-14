import App from './App'
import PropTypes from 'prop-types'
import './Main.css'

function Main(){
  

  return(
    <>
    <div className="container" ></div>
    <div className="left"></div>
    <div className="data" >     
      <App />
    </div>
    <div className="right "></div>
    </>
 
  )
}
Main.prototypes ={
  theme:PropTypes.string,
}
export default Main;

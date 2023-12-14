import "./Selectlist.css";
import { useState } from "react";
import Insert from './Insert'

function Selectlist() {
  const [nationArr , setnationArr] = useState([
    { name:"India" ,code:"IN" }, 
    { name:"China" ,code:"ch" }, 
    { name :"Japan",code:"Jp" }]);

  function getkeyvalue(e){
   console.log(e.target.value);
  }
  function updatelist( getname ,getcode){
    setnationArr([...nationArr, {name:getname,code:getcode}]);

  }
  
  return (
    <>
      <Insert updatelist={updatelist}/>

        <label htmlFor="selectlist" >Nation : </label>

        <select id="selectlist" onChange={getkeyvalue} >
            {nationArr.map((nation) =>(
                <option key={nation.code} value={nation.code}> {nation.name} </option>
            ))} 
        </select>
    </>
  );
}

export default Selectlist;

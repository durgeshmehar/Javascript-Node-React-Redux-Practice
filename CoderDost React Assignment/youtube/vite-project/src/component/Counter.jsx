import { useMemo,useCallback } from "react";
import {useCounter, useWindowSize} from "../hook/CounterHook"



  function Counter(){
     const [count ,inc ,dec] =useCounter(40);
     const [height ,width ] =useWindowSize();
    
     const fibx = useCallback(function fib(num){
        if(num ===1 || num===2){
            return 1;
        }
        else if (num <= 0) {
            return 0;
        }
        return fib(num-1)+fib(num-2);
        },[])
       
      const fibMemo =useMemo(()=>fibx(count) ,[count,fibx])

    return(
        <>
        <h3 style={{margin:"2vw",marginBottom:"0vw"}}>{count}&nbsp; : &nbsp;{fibMemo}</h3>
        <button onClick={inc}>Increase</button>
        <button onClick={dec}>Decrease</button>
        {console.log(`height : ${height}  width :${width}`)}
        </>
    )
}
export default Counter;

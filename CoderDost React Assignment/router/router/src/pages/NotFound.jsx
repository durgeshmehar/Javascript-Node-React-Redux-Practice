import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    useEffect(()=>{
       setTimeout( ()=>{
        navigate("/",{state :"Error not found"})
       },1000)
    } ,[navigate])

    return (<>
     <h2>  🙅🏽 NotFound</h2>
    </>)
    // return <Navigate to="/" />;
}
export default NotFound;
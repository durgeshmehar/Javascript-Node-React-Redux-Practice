import DispatchContext from "../context/DispatchContext";
import { useContext } from "react";

function useDispatchItem(){
    return useContext(DispatchContext);
}
export default useDispatchItem;
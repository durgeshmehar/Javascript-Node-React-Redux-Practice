import FontContext from "../context/FontContext";
import { useContext } from "react";

function useFontItem(){
    return useContext(FontContext);
}
export default useFontItem;
import videoDispatchContext from "../context/VideoDispatchContext";
import { useContext } from "react";

function useVideoDispatch(){
    return useContext(videoDispatchContext);
}
export default useVideoDispatch;
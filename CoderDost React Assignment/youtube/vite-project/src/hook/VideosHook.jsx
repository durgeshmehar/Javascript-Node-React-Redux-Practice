import VideosContext from "../context/videosContext";
import { useContext, useDebugValue } from "react";

function useVideos(){
    useDebugValue(useContext(VideosContext).length)
    return useContext(VideosContext);
}
export default useVideos;
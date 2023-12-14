import Video from "./Video";
import axios from "axios"
import PropTypes from "prop-types";
import useVideos from '../hook/VideosHook'
import { useState } from "react";
import useVideoDispatch from "../hook/VideoDispatchHook";

function Videomap({editVideo}) {
   const info =useVideos();
   const dispatch =useVideoDispatch();
   const URL ="https://api.mockaroo.com/api/b7e270f0?count=10&key=c89e8360";

   
   useState(()=>{
    async function autoLoadVideo(){
      const res = await axios.get(URL);
      
      dispatch({ type:"LOAD" ,payload:res.data });
     }
    autoLoadVideo();
   },[dispatch])
   
  return (
    <>
    {console.log("videomap")}
      {info.map((item) => (
        <Video
          id={item.id}
          title={item.title}
          imgname={item.imgname}
          views={item.views}
          ago={item.ago}
          verified={item.verified}
          channelname={item.channelname}
          key={item.id}
          editVideo={editVideo}
        />
      ))}

    </>
  );
}

Videomap.propTypes = {
  editVideo: PropTypes.func,
};

export default Videomap;

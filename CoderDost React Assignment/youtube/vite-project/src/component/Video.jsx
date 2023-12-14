import "./Video.css";
import PropTypes from "prop-types";
import { useCallback, useContext ,useEffect, useMemo ,memo, useId} from "react";
import Playbutton from "./Playbutton";
import ThemeContext from '../context/ThemeContext';
import useVideoDispatch from '../hook/VideoDispatchHook'

const Video= memo(function Video({ id,title, imgname, views, ago, verified, channelname,editVideo }) {
  const theme= useContext(ThemeContext);
  const dispatch = useVideoDispatch();

  useEffect(()=>{
  //  const idx=  setInterval(()=>{
    const idx= console.log("Video of id rendered ",id);
    // },2000)
    return()=>{
      clearInterval(idx);
    }
  },[id])
  const uid =useId();

  const Play = useCallback(() => { console.log("Playing ...", title ) },[title])
  // const Play = useMemo(()=>() => { console.log("Playing ...", title ) },[title])
  // const Pause = useMemo(()=>() => { console.log("Pausing ...", title ) },[title])
  const Pause = useCallback(() => { console.log("Pausing ...", title ) },[title])
  const memoButton =useMemo(()=>   
  <Playbutton
      onPlay={()=>Play(title)} 
      onPause={()=>Pause(title) } >
      {title}
 </Playbutton>,[Play,Pause,title])
  return (
    <>
  
      <div className="youtube-box" id={uid}>
        {console.log("Render video :"+id)}
        <button className={`deletebutton ${theme}`} onClick={ ()=>dispatch({type:"DELETE" , payload:id}) }> ❌</button>
        <button className={`editbutton ${theme}`} onClick={ ()=>editVideo(id) }> 📝</button>
        <img
          src={`https://source.unsplash.com/300x200?${imgname}`}
          alt="youtube-video"
        />

        <div className="contain">
          <div className="icon">
            <img
              src={`https://source.unsplash.com/300x200?${imgname}`}
              alt="youtube-channel"
            />
          </div>
          <div className="text">
            <h3 className={`video-name ${theme}`}> {title}</h3>
            <p className={`block ${theme}`}>
              {" "}
              {channelname}&nbsp;{verified ? "✅" : null}
            </p>
            <p className={`block ${theme}`}>
              {" "}
              {views}k views &nbsp;•&nbsp; {ago}days ago
            </p>
          </div>
          </div>
           <div className="buttondiv">
           {memoButton}
        </div>
      </div>
    </>
  );
})

Video.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgname: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  ago: PropTypes.string.isRequired,
  channelname: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  editVideo:PropTypes.func,
};

export default Video;

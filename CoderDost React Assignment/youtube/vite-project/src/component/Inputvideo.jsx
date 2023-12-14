import './Inputvideo.css'
import PropTypes from "prop-types";
import { useContext, useState ,useLayoutEffect ,useRef, useEffect, forwardRef} from 'react';
import ThemeContext from '../context/ThemeContext';
import useVideoDispatch from '../hook/VideoDispatchHook'
import { useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { flushSync } from 'react-dom';

const Inputvideo = forwardRef(function Inputvideo({ editableVideo } ,ref) {

  const imgArr = ["c++", "databases", "webdevelopment", "computer", "mobile", "programming", "developer"];
  const index = Math.floor(Math.random() * imgArr.length);

  let initialstate = {
    title: "",
    views: "",
    imgname: imgArr[index],
    ago: "1 months",
    verified: true,
    channelname: "Code help",
    id: "",
  };

// To use Flushsync  -->
  const [count, setCount] = useState(0);

  function handleClick() {
    // Update state using flushSync()
    flushSync(() => {
      setCount(count=>count + 1);
      setCount(count=>count + 1);
      setCount(count=>count + 1);
    });
   window.print()
    console.log('Count:', count); // Output: Count: 0
  }
// To use Flushsync  <---

    // const inputRef =useRef(null)

  const dispatch = useVideoDispatch();

  const [newvideo, setnewvideo] = useState(initialstate);

  function handlesubmit(e) {
    e.preventDefault();
    if (editableVideo.id !== "") {
      dispatch({ type: "UPDATE", payload: newvideo })
    }
    else if (newvideo.title !== "" && newvideo.views !== "") {
      dispatch({ type: "ADD", payload: newvideo });
    }
    else { alert("Dont leave any box empty!") }
    setnewvideo(initialstate);
  }
  useEffect(()=>{
     if (editableVideo.id) {
      setnewvideo(editableVideo)
   }
    // inputRef.current.focus();
  },[editableVideo])
  const iRef =useRef(null);

  useImperativeHandle(ref ,()=>{
    return {
      inputFocus(){
        iRef.current.focus();
      }
    }
  })
useLayoutEffect(()=>{
  const {rect} = iRef.current.getBoundingClientRect();
  console.log(rect);
 
},[])
  function handlechange(e) {
    setnewvideo({ ...newvideo, [e.target.name]: e.target.value });
  }
  const theme= useContext(ThemeContext)

  return (
    <>
      <form >
        <input type="text" ref={iRef} value={newvideo.title} name="title" onChange={handlechange} placeholder="Enter title" />
        <input type="text" value={newvideo.views} name="views" onChange={handlechange} placeholder="Enter views" />

        <div className="click">
          <button className={`${theme}`} onClick={handlesubmit}> {editableVideo.id !== "" ? 'Edit Video' : 'Add Video'} </button>
        </div>
      </form>
      
      <div>
      <button onClick={handleClick}>Increment</button>
      <p>Count:{' '}{count}</p>
    </div>

      {createPortal(
        <h1>This is style & HTML by react inputvideo file to test createPortal react dom functionality</h1>,document.getElementById('root1')
      )}

    </>
  )
})

Inputvideo.propTypes = {
  editableVideo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  // ref:PropTypes.ref,

}

export default Inputvideo;
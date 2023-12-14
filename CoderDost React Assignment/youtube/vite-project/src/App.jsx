import "./App.css";
// import infoDB from "./data/info";
import Inputvideo from "./component/Inputvideo"
import Videomap from "./component/Videomap"
import React, { Suspense } from 'react'
import { useState,useRef, useReducer, useContext ,useCallback ,lazy} from 'react';
import ReactDOM from 'react-dom/client'
import Switch from 'react-switch';
import ThemeContext from "./context/ThemeContext";
import VideoDispatchContext from "./context/VideoDispatchContext" ;
import VideosContext from "./context/videosContext";
import Counter from"./component/Counter"
import { useEffect } from "react";
const Dummy = lazy(()=>import('./component/Dummy'));

function App() {
  const inputRef =useRef(null);
  const [mode, setmode] = useState('dark');
  const [editableVideo, seteditableVideo] = useState({ title: "", views: "", id: "" });

  const [show ,setshow] =useState(false);
  function infoReducer(info, action) {
    const newV = [...info];
    let index = 0;
    switch (action.type) {
      case "LOAD":
        return action.payload;
      case "ADD":
        return [...info, { ...action.payload, "id": (info.length < 3) ? info.length + 4 : info.length + 1 }]
      case "DELETE":
        return info.filter((item) => item.id !== action.payload);
      case "UPDATE":
        index = info.findIndex((item) => item.id === action.payload.id);
        newV.splice(index, 1, action.payload);
        seteditableVideo({ title: "", views: "", id: "" });
        return newV;
      default:
        return info;
    }
  }
  const [info, dispatch] = useReducer(infoReducer, []);

  const editVideo= useCallback(function editVideo(id) {
    seteditableVideo(info.find((item) => item.id === id))
  },[info])

  const theme = useContext(ThemeContext)
  useEffect(()=>{
     inputRef.current.inputFocus();
    //  inputRef.current.focus();
  },[editableVideo ,info])

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={mode}>
        <VideosContext.Provider value={info}>
          <VideoDispatchContext.Provider value={dispatch}>

        <Counter />
        <button onClick={()=>{setshow(!show)}}>Show</button>
           {show?
           <Suspense fallback={<>Loading .........</>}>
             <Dummy />
            </Suspense>
            :null}

          <div className={`app-body ${mode}`} >
            {/* {<button className={`${theme}`} onClick={()=>setmode( mode==='dark'?'light':'dark')}>Mode</button> } */}
            <div className="switch">

              <Switch className={`${theme}`} checked={mode === "dark"} onChange={() => setmode(mode === 'dark' ? 'light' : 'dark')} />
            </div>

            <Inputvideo  ref={inputRef} editableVideo={editableVideo} />
            <Videomap editVideo={editVideo} />
          </div>
           
          </VideoDispatchContext.Provider>
        </VideosContext.Provider>
      </ThemeContext.Provider>
    </React.StrictMode>

  );
}

export default App;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

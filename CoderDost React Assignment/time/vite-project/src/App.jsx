import "./App.css";
import { useState ,useEffect} from "react";

function App() {
  let [time, settime] = useState(new Date());
  let [starttime, setstarttime] = useState(new Date());

  let [mstart, setmstart] = useState("");
  let [mstop, setmstop] = useState("");
  let [mreset, setmreset] = useState("");

  useEffect(()=>{
    setInterval(()=>{
      settime(new Date());
    },1000)
  })

  function handleStart() {
    setmstart(`Timer is started at ${time.toLocaleTimeString()}`); 
    setstarttime(new Date())

  }
  function handleStop() {
    setmstop(`Timer is stoped at ${time.toLocaleTimeString()}`);
  }
  
  function handleReset() {
    setmstart("");  setmstop("");
    setmreset("Reset succesfully ..");
  }
  return (
    <>
      <h1>Format 👉 HH : MM :SS </h1>
      <br />
      <h2>Time 👉 {time.toLocaleTimeString()} </h2>
     
      <h2>Elapsed Time 👉 {Math.floor((time-starttime)/(1000*60*24))%24} :  {Math.floor((time-starttime)/(60*1000))%60} :{Math.floor((time-starttime)/1000)%60} </h2>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <br />
      <br />
      <p>{mstart}</p>
      <p>{mstop}</p>
      <p>{mreset}</p>
    </>
  );
}

// import "./App.css";
// import { useState ,useEffect,useRef} from "react";
// // IMPLEMENTING THE TIMEING
// function App() {
//   let now = useRef(new Date());
//   let timeArray = [now.current.getHours(), now.current.getMinutes(), now.current.getSeconds()];

//   let [time, settime] = useState(timeArray);
//   //  let [mintime ,setmintime] =useState(now.getMinutes());


//   useEffect(()=>{
    
//     setInterval(()=>{
//       now.current = new Date();
//       timeArray = [now.current.getHours(), now.current.getMinutes(), now.current.getSeconds()];
//       settime(timeArray);
//     },1000)
//     console.log(timeArray);
//   } ,[] )

  


//     if (time[1] != now.current.getMinutes()) {
//        console.log("One Minute Done ,current :", now.current.getMinutes());
//     }

//   return (
//     <div className="app-body">
//       <h1>
//         {time[0]} ::{time[1]}::{time[2]}
//       </h1>
//     </div>
//   );
// }

export default App;

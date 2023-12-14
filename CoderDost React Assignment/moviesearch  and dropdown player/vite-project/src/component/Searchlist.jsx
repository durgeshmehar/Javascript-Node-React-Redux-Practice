import { useState } from "react";
import "./Searchlist.css";

function Searchlist() {

   const[movies ,setmovie]=useState(["Karan Arjun","Bajigar","Tu khiladi Mai anadi","Hassina maan jayegi" ,"My name is khan","Pardesh","Citadel","Special ops"]);

   const[searchtext ,setsearchtext]=useState("");
   
   const getMovies = movies.filter((movie)=>{
        return movie.toLowerCase().includes(searchtext.toLowerCase()) ;
     })

   function handlechange(e){
      setsearchtext(e.target.value);
   }
   function addmovie(){
    if( searchtext !=="") setmovie([...movies,searchtext]);
    setsearchtext("");
   }

   return(
    <>
    <hr />
    <br />
     <h2> 🎥🎥 🎞️🎞️📽️  Movies 📽️🎬🎬🎦🎦 </h2>
    Search Movie:<input type="text" placeholder="seach movie name" value={searchtext} onChange={handlechange} />
     <button onClick={addmovie}> Add Movie </button>
    <div className="display">
        <ul>
            { getMovies.map((movie)=>{return <li key={movie}>{movie}</li>; }) }
        </ul>
    </div>
    </>
   )
}

export default Searchlist;
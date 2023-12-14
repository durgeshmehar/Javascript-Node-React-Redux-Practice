import './Playbutton.css'
import { useState,useContext,memo } from "react";
import PropTypes from 'prop-types';
import ThemeContext from '../context/ThemeContext';

const Playbutton =memo(function Playbutton({onPlay ,onPause ,children}){
    const [playing ,setplaying]=useState(false);

    function handleEvent(e){
        e.stopPropagation();
       if(!playing) onPlay(); 
       else onPause();
       setplaying(playing=>!playing);
    }
    const theme= useContext(ThemeContext)
    console.log("Plaubutton is rendered !")
    return(
        <>
        <button className={`${theme}`} onClick={handleEvent}>{children}&nbsp;{playing?'⏸️':'▶️' } </button>
        </>
        
    )
})

Playbutton.propTypes ={
    onPlay : PropTypes.func,
    onPause : PropTypes.func,
    children :PropTypes.string,
}

export default Playbutton;
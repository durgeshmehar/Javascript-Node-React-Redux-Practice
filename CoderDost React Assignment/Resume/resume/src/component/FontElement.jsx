import {  useState,useContext } from "react";
import useFontItem from "../hook/FontItem";
import PropTypes from 'prop-types';
import Themecontext from '../context/Themecontext'
 
function FontElement(){
    const {fontstyle ,setfontstyle}=useFontItem();

    const [fontSizeInput, setFontSizeInput] = useState("");
    const [fontColorInput, setFontColorInput] = useState("");
    const [fontFamilyInput, setFontFamilyInput] = useState("");
    
    function onsubmit(e){
        e.preventDefault();
        let temp={}
        if(fontSizeInput!==""){
             temp={["fontSize"]:fontSizeInput};
        }
        if(fontColorInput!==""){
             temp={...temp,["color"]:fontColorInput};
        }
        if(fontFamilyInput!==""){
             temp={...temp ,["fontFamily"]:fontFamilyInput };
        }
        console.log(temp)
        setfontstyle({...fontstyle ,...temp} );
        
        setFontSizeInput("");
        setFontColorInput("");
        setFontFamilyInput("");
    }
    function doFontchange(e){
        e.preventDefault();
        let temp= fontSizeInput;
        temp =e.target.value;
        setFontSizeInput(temp);
    }
    function doColorchange(e){
        let temp= fontColorInput;
        temp =e.target.value;
        setFontColorInput(temp);
    }
    function doFamilyChange(e){
        let temp= fontFamilyInput;
        temp =e.target.value;
        setFontFamilyInput(temp);
    }
    const theme =useContext(Themecontext)

    return(
        <>

        <form style={{ padding:"2vw",border:"2px solid grey"}} onSubmit={onsubmit}>
            <h4 style={{ margin:"1vw 1vw 1vw 0",color:"green"}}>Font Style Change</h4>

            Font Size:<input className={`${theme}`} type="text" value={fontSizeInput} placeholder="Enter font size" onChange={(e)=>{doFontchange(e) }} /> 

            Font Color:<input className={`${theme}`} type="text" value={fontColorInput} placeholder="Enter color" onChange={(e)=>{doColorchange(e) }} /> <br/>

            Font Family:<input className={`${theme}`} type="text" value={fontFamilyInput} placeholder="Enter font family" onChange={(e)=>{ doFamilyChange(e)} }/>

            <button type="submit">Submit</button>
        </form>
       
        </>
    )
}

FontElement.propTypes ={
    handlefontsize : PropTypes.func,
}


export default FontElement;
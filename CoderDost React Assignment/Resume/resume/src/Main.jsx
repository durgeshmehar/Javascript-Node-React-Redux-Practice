import App from './App'
import PropTypes from 'prop-types'
import Switch from "react-switch"
import ThemeContext from "./context/Themecontext"
import './Main.css'
import { useState } from 'react'

function Main() {
  const [mode, setmode] = useState("light");
  return (
    <>
      <ThemeContext.Provider value={mode}>
         <div className={`bodyDiv${mode}`}>

        <div className={`container container${mode} `} >
          <Switch className="react-switch" checked={mode === "dark"} onChange={() => setmode(mode === 'dark' ? 'light' : 'dark')} />
        </div>

        <div className={`left left${mode}`}></div>
        <div className={`data data${mode} `} >
          <h1>Resume </h1>
          <h2>Durgesh</h2>
          <br />
          <hr />
          <App />
        </div>
        <div className={`right right${mode}`}></div>

         </div>
      </ThemeContext.Provider>
    </>

  )
}
Main.prototypes = {
  theme: PropTypes.string,
}
export default Main;

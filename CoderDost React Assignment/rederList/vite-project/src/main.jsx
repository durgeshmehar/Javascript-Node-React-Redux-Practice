import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";


const items =["Durgesh" ,"Mukunda" ,"Mehar","shivani"];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="container"></div>
    <div className="left"></div>
    <br />
    <br />
    <br />

    <div className="data">
      <App layout="numbered" items={items} />
      <App layout="alpha" items={items} />
      <App layout="bullet" items={items} />
    </div>

    <div className="right "></div>
  </React.StrictMode>
);

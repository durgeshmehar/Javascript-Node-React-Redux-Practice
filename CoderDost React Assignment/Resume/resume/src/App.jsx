import { useState, useReducer } from "react";
// import Post from "./component/Post"
import "./App.css";
import Listitem from "./component/Listitem";
import Updatelist from "./component/Updatelist";
import FontElement from "./component/FontElement"
import FontContext from "./context/FontContext";
import DispatchContext from "./context/DispatchContext";

function App() {
  const initial = {
    Interests: ["Drawing", "Photograghy", "Programming", "Design"],
    Skills: ["Web Design with HTML & CSS"],
    Education: [
      "Wilton High School",
      "Silvermine School of Arts",
      "Codeacademy",
    ],
    Experience: [
      "Student Technology",
      "Intern for Wilton School",
      "District Babysitter",
    ],
    Extracurriculars: ["Recycling Club", "Gardening Club", "Book Club"],
    DSA: [],
  };


  function listReducer(list, action) {
    let copying = {};
    let newList = {};
    let newArray = []
    let index, title, data = 0

    switch (action.type) {
      case 'ADD':
        copying = { ...list };
        for (const key in action.payload) {
          if (Object.prototype.hasOwnProperty.call(copying, key)) {
            const newValue = Array.isArray(action.payload[key]) ? action.payload[key] : [action.payload[key]];
            copying[key] = [...copying[key], ...newValue];
          }
        }
        return (copying);
      case 'DELETE':
        newList = {};
        for (const key in list) {
          if (Object.hasOwnProperty.call(list, key)) {
            const itemArray = list[key];
            const filteredArray = itemArray.filter((item, i) => key === action.payload.title && i === parseInt(action.payload.index) ? false : true);
            newList[key] = filteredArray;
          }
        }
        return newList;
      case 'UPDATE':
        index = parseInt(action.payload.index);
        title = action.payload.title;
        data = action.payload.data;
        newArray = list[title].map((item, i) => {
          if (i === index) {
            return data;
          }
          return item;
        })
        return ({ ...list, [title]: newArray });
      default:
        return list;
    }
  }
  let [list, dispatch] = useReducer(listReducer, initial);

  const [deleteitem, setdeleteitem] = useState("");
  const [edititem, setedititem] = useState("");
  const [editstate, seteditstate] = useState();
  const [deletestate, setdeletestate] = useState(false);
  const [edit, setedit] = useState({ title: "", index: "", data: "" });


  function ondeleteitem(title) {
    setdeleteitem(title);
  }
  function onedititem(title) {
    setedititem(title);
  }

  function oneditactive(state) {
    seteditstate(state);
    if (!state) {
      setedit({ title: "", index: "", data: "" })
    }
  }
  function ondelactive(state) {
    setdeletestate(state);
  }
  function handleclick(e) {
    e.preventDefault();
    window.print();
  }

  function handleedit(titles, indexs) {
    setedit({ ["title"]: titles, ["index"]: indexs, ["data"]: list[titles][parseInt(indexs)] });
  }
  const [fontstyle, setfontstyle] = useState({
    fontSize: '',
    color: '',
    fontFamily: '',
  })



  return (<>
    <FontContext.Provider value={{ fontstyle, setfontstyle }}>
      <DispatchContext.Provider value={dispatch}>
        <div className="app-body">
          <FontElement />

          <Updatelist list={list} ondeleteitem={ondeleteitem} onedititem={onedititem} oneditactive={oneditactive} ondelactive={ondelactive} edit={edit} />

          <Listitem list={list} deleteitem={deleteitem} edititem={edititem} deletestate={deletestate} editstate={editstate}  onMainedit={handleedit} />

          <div className="printbutton">
            <button onClick={handleclick}> Download ⏬</button>
          </div>

          <hr />
        </div>
      </DispatchContext.Provider>
    </FontContext.Provider>

  
  </>
  );
}

export default App;

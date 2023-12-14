import { useState,useContext, useEffect } from "react";
import "./Updatelist.css";
import PropTypes from "prop-types";
import useDispatchItem from "../hook/DispatchItem";
import ThemeContext from "../context/Themecontext";

function Updatelist({list,ondeleteitem,onedititem,oneditactive,ondelactive,edit,}) {
  const initial = {
    Interests: [],
    Skills: [],
    Education: [],
    Experience: [],
    Extracurriculars: [],
    DSA: [],
  };
  const dispatch = useDispatchItem();
  const [changelist, setchangelist] = useState(initial);
  const [editActive, setEditActive] = useState(true);
  const [delActive, setdelActive] = useState(true);

  const [inputvalue, setinputvalue] = useState(edit);
  useEffect(() => {
    setinputvalue(edit);
  }, [edit]);

  function handlechange(e, category) {
    setchangelist({ ...changelist, [category]: e.target.value });
    console.log(e.target.name, e.target.value);
    setinputvalue({ ...inputvalue, ["data"]: e.target.value });
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (edit.title != "") {
      const newedit={ ...edit, ["data"]: inputvalue.data };
      dispatch({type:'UPDATE',payload:newedit })

    } else {
      dispatch({type:'ADD',payload:changelist});
      setchangelist(initial);
    }
    setinputvalue({ title: "", index: "", data: "" });
  }

  function handleupdate(e) {
    e.preventDefault();
    setEditActive(!editActive);
    oneditactive(editActive);
    onedititem(e.target.name);
  }

  function handledelete(e) {
    e.preventDefault();
    setdelActive(!delActive);
    ondelactive(delActive);
    ondeleteitem(e.target.name);
  }
  const theme = useContext(ThemeContext)
  return (
    <div className="updatediv">
      <h2>Update Resume</h2>
      <div className="hrline">
        <hr />
      </div>

      {list && Object.keys(list).map((category) => (
        <div className="item" key={category}>
          <p>{category} :</p>
          <form>
            <input className={`${theme}`}
              type="text"
              name={category}
              value={
                edit.title === category ? inputvalue.data : changelist[category]
              }
              placeholder={`Enter ${category}`}
              onChange={(e) => handlechange(e, category)}
            />
            {/* {console.log(edit.title,category ,inputvalue.data)} */}
            <button onClick={handlesubmit}>{(edit.title === category) && (edit.title != "") ? 'Edit Item' : 'Add Item'}</button>
            <button onClick={handleupdate} name={category}>
              📝
            </button>
            <button onClick={handledelete} name={category}>
              ❌
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
Updatelist.propTypes = {
  list: PropTypes.object,
  ondeleteitem: PropTypes.func,
  onedititem: PropTypes.func,
  oneditactive: PropTypes.func,
  ondelactive: PropTypes.func,
  edit: PropTypes.object,
};
export default Updatelist;

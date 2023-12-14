import "./Listitem.css";
import { useContext } from "react";
import useFontItem from "../hook/FontItem"
import PropTypes from "prop-types";
import useDispatchItem from "../hook/DispatchItem";
import ThemeContext from "../context/Themecontext";


function Listitem({ list, deleteitem, edititem, editstate,deletestate,  onMainedit }) {
  const dispatch = useDispatchItem();
  const {fontstyle} = useFontItem();
  function handlesedit(e) {
    onMainedit(e.target.name, e.target.id);
  }
  function handlesdelete(e) {
    let title=e.target.name;
    let index =e.target.id;
    dispatch({type:'DELETE', payload:{title,index} })
  }
  const mode =useContext(ThemeContext);

  return (
  <div className="button-body">

     {list && Object.keys(list).map((title) => (
        list[title].length ? (
            <ul className={`UL UL${mode}`} key={title}>{title} <br/>
              {
                list[title].map((item, index) => (
                  <li className={`LI LI${mode}`} key={item} name={title} id={title} style={{fontSize: fontstyle.fontSize,color:fontstyle.color,fontFamily :fontstyle.fontFamily}}>
                    {item}
                    
                    <span className="indivisualbtn">
                    {(title === edititem && editstate) ? <button onClick={handlesedit} name={title} id={index}>📝</button> : null}
                    {(title === deleteitem && deletestate) ? <button onClick={handlesdelete} name={title} id={index}>❌</button> : null}
                    </span>
                  </li>
                ))
              }
            </ul>
        ) :null
      ))}
    </div>

  );
}

Listitem.propTypes = {

  list: PropTypes.object,
  deleteitem: PropTypes.string,
  edititem: PropTypes.string,
  editstate: PropTypes.bool,
  deletestate: PropTypes.bool,
  onMainedit: PropTypes.func,
};

export default Listitem;

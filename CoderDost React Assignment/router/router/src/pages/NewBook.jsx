// import {Link} from "react-router-dom"

import { useOutletContext } from "react-router-dom";

function BookList(){
    const layout = useOutletContext();
    return (<>
     <h2>NewBook by {layout.hello}</h2>
    </>)
}
export default BookList;
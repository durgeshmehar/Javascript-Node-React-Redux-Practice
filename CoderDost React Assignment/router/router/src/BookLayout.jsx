
import {Link ,Outlet,useSearchParams} from "react-router-dom"

function BookLayout(){
    const [searchParam ,setsearchParam ]= useSearchParams({ n:3});
    const number = searchParam.get("n");
    return (<>
     <Link to="/books/1">Book 1</Link>  <br/>
     <Link to="/books/2">Book 2</Link>
     <br/>
     <Link to="/books/${number}">Book {number}</Link>
     <br/>
     <Link to="/books/new">New Books</Link>
     <Outlet context={{hello:"durgesh",mood:"fine"}}/>

     <input value={number} type="number" onChange={(e)=>{
        setsearchParam( {n:e.target.value});
     }}/>
    </>)
}
export default BookLayout;


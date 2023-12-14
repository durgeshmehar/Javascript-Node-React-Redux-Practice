import {useParams ,useOutletContext} from "react-router-dom"
function Book(){
    const { id } = useParams();
    const layData = useOutletContext();
    return (<>
     <h2>Book single Item {id} {layData.hello} with {layData.mood}</h2>
    </>)
}
export default Book;
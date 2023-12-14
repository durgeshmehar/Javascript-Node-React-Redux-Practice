import BookLayout from "./BookLayout";
import BookList from "./pages/BookList";
import NewBook from "./pages/NewBook";
import {Routes ,Route} from "react-router-dom"
import Book from "./pages/Book";

function BookRoute(){
    return( <>
       <Routes >
          <Route element={<BookLayout />  } >
            <Route index  element={<BookList />} />
            <Route path=":id" element={<Book />} />
            <Route path="new" element={<NewBook />} />
          </Route>
       </Routes>
      </>
    )

}
export default BookRoute;
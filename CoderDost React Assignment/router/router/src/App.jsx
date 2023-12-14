import "./App.css";

import BookRoute from "./BookRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import { Routes, Route, NavLink, useLocation } from "react-router-dom";

function App() {
  const location =useLocation();
  console.log(location)
  return (
    <>
      <nav>
        <ul>

          <li> <NavLink to="/"  state="hii"> Home
          </NavLink></li>
          <li> <NavLink end to="/books"> bookList </NavLink></li>
        </ul>
      </nav>
      {location.state}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/*" element={<BookRoute />}>
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;

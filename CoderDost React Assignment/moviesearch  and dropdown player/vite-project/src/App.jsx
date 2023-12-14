import "./App.css";
import Selectlist from "./component/Selectlist";
import Searchlist from "./component/Searchlist";

function App() {
  return (
    <div className="app-body">
      <div className="selectionList">
        <Selectlist />
        <br /><br /><br />
      </div>

      <div className="searchlist">
  
        <Searchlist />
      </div>
    </div>
  );
}

export default App;

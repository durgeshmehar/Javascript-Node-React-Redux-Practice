import "./App.css";
import PropTypes from 'prop-types';

function App({layout ,items}) {

  const renderItems=() =>{
    return items.map((item ,index) =>{
    
    let prefix =" ";
    if( layout ==='numbered' ){
      prefix =`${index+1}`;
    }
    else if( layout =='alpha'){
      prefix = `${String.fromCharCode(97 + index)} `;
    }
    else{
      prefix =`👉`;
    }
    return (
      <li key={index}>{prefix}  &emsp; {item}</li>
    );
    });
  };
 
  return (
    <div className="app-body">
    <ul>{renderItems()}</ul>
     <br />
    </div>
  )
}

App.propTypes ={
  layout :PropTypes.string.isRequired,
  items :PropTypes.array.isRequired,
}

export default App;

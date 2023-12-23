import './App.css'
import Counter from './component/Counter'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  
  return(
    <div>
      <h1>This is My App</h1>
      <button onClick={() => { dispatch({type:'increment'})}}>Increment</button>
      <Counter />
      <button onClick={() => { dispatch({type:'decrement'})}}>decrement </button>
    </div>
  )
}

export default App

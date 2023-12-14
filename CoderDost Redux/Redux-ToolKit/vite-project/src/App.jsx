/* eslint-disable react/prop-types */
import Accounts from './Accounts'
import Bonus from './Bonus'
import {useSelector } from 'react-redux';
import Admin from './Admin'


function App() {

	const amount =  useSelector(state => state.account.amount);
	const points =  useSelector(state => state.bonus.points);
  
  return (
    <div>
		<div className="top">
			<h1 className='head-color'>App</h1>
			
			<h2 className='subhead-color'> Current Amount : {amount} </h2>
			<h2 className='subhead-color'> Total Bonus : {points} </h2>
			
		</div>
		<div className='middle'>
			<Accounts />
		</div>
		<div className='bottom'>
			<Bonus />
			<Admin />
		</div>
    </div>

  )
}

export default App


/* eslint-disable react/prop-types */
import Accounts from './Accounts'
import Bonus from './Bonus'
import {useSelector } from 'react-redux';


function App() {

	const account =  useSelector(state => state.account);
	const amount =  useSelector(state => state.account.amount);
	const points =  useSelector(state => state.bonus.points);
  
  return (
    <div>
		<div className="top">
			<h1 className='head-color'>App</h1>
			{(account.pending)?<h2> Loading ...</h2>:account.error?<h2>{account.error}</h2> :
			(<div>
				<h2 className='subhead-color'> Current Amount : {amount} </h2>
				<h2 className='subhead-color'> Total Bonus : {points} </h2>
			</div>)
			}

		
		</div>
		<div className='middle'>
			<Accounts />
		</div>
		<div className='bottom'>
			<Bonus />
		</div>
    </div>

  )
}

export default App


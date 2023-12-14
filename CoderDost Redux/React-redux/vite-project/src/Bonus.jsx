/* eslint-disable react/prop-types */
import { incrementBonus } from '../actions';
import {useSelector ,useDispatch} from 'react-redux';

function Bonus(){
	const points =  useSelector(state => state.bonus.points);
	const dispatch = useDispatch();
	return (
		<>
			<h2 className='head-color'> Bonus Component</h2>
			<h3 className='subhead-color'> Total Points : {points} </h3>
			<button className='btn' onClick={()=>{ dispatch(incrementBonus()) } }>
				Increment +
			</button>
		</>
	);
}


export default Bonus;
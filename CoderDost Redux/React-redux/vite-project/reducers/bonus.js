
import { incValue, incBonus } from '../actions';

export function bonusReducer(state ={points:0} , action) {
	switch (action.type) {
	case incValue:
		if( action.payload > 100 ){
			return {points : state.points + 1 };
		}
		return state;
	case incBonus:
		return {points : state.points + 1 };
	default:
		return state;
	}
}

import {getUserAccountSucc , getUserAccountRej , getUserAccountPen , inc , dec , incValue} from '../actions';

export function accountReducer(state={amount:1} , action) {
	switch (action.type) {
	case getUserAccountSucc:
		return {amount: action.payload , pending: false};
	case getUserAccountRej:
		return {...state , error: action.error , pending: false};
	case getUserAccountPen:
		return {...state , pending: true};
	case inc:
		return {amount: state.amount +1};
	case dec:
		return {amount: state.amount -1};
	case incValue:
		return {amount: state.amount +action.payload};
	default:
		return state;
	}
}
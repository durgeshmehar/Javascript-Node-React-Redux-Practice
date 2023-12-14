import { createStore ,applyMiddleware ,combineReducers} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

const getUserAccountSucc = "account/getUserAccount/Success"
const getUserAccountRej = "account/getUserAccount/Reject"
const getUserAccountPen = "account/getUserAccount/Pending"
const inc = "account/increment"
const dec = "account/decrement"
const incValue = "account/incrementValue"
const incBonus = "bonus/increment"


const store = createStore(combineReducers({ 
	account:accountReducer,
	bonus : bonusReducer
}) ,applyMiddleware(logger.default,thunk.default )) 

function accountReducer(state={amount:1} , action) {
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
function bonusReducer(state ={points:2} , action) {
	switch (action.type) {
	// case init:
	// 	return {amount: action.payload};
	case inc:
		return {points : state.points + 1 };
	// case dec:
	// 	return {amount: state.amount -1};
	case incValue:
		if( action.payload > 100 ){
			return {points : state.points + 1 };
		}
	case incBonus:
		return {points : state.points + 1 };
	default:
		return state;
	}
}

//Action Creator
// async function getUser(dispatch , getState){
// 	const {data} = await axios.get('http://localhost:3000/accounts/1')
// 	dispatch( initUser(data.amount) )
// }
function getUserAccount(id){
	
		return async (dispatch , getState)=>{
			try{
				dispatch( getUserAccountPending() );
			const {data} = await axios.get(`http://localhost:3000/accounts/${id}`)
			dispatch( getUserAccountSuccess(data.amount) );
		   }
		   catch(error){
			dispatch( getUserAccountReject(error.message) );
		}
	}
}

function getUserAccountSuccess(value){
	return {type: getUserAccountSucc ,payload: value }
}
function getUserAccountReject(error){
	return {type: getUserAccountRej , error:error }
}
function getUserAccountPending(){
	return {type: getUserAccountPen}
}

function increment(){
	return {type: inc}
}
function decrement(){
	return {type: dec}
}
function incrementValue(value){
	return {type: incValue, payload: value}
}
function incrementBonus(){
	return {type: incBonus}
}


// store.subscribe(() => {
// 	history.push(store.getState())
//    console.log(history)
// }) 

setTimeout(() => {
	// store.dispatch( increment() )
	// store.dispatch( incrementValue(10) )
	// store.dispatch( incrementBonus() )
	store.dispatch( getUserAccount(1) )
}, 2000)


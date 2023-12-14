import axios from "axios";

// Action name constants
export const getUserAccountSucc = "account/getUserAccount/Success";
export const getUserAccountRej = "account/getUserAccount/Reject";
export const getUserAccountPen = "account/getUserAccount/Pending";
export const inc = "account/increment";
export const dec = "account/decrement";
export const incValue = "account/incrementByAmount";
export const incBonus = "bonus/increment";

export function getUserAccount(id) {
	return async (dispatch) => {
		try {
			dispatch(getUserAccountPending());
			const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
			dispatch(getUserAccountSuccess(data.amount));
		} catch (error) {
			dispatch(getUserAccountReject(error.message));
		}
	};
}

//Action Creator
export function getUserAccountSuccess(value) {
  return { type: getUserAccountSucc, payload: value };
}
export function getUserAccountReject(error) {
  return { type: getUserAccountRej, error: error };
}
export function getUserAccountPending() {
  return { type: getUserAccountPen };
}

export function increment() {
  return { type: inc };
}
export function decrement() {
  return { type: dec };
}
export function incrementByAmount(value) {
  return { type: incValue, payload: value };
}
export function incrementBonus() {
  return { type: incBonus };
}

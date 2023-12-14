/* eslint-disable react/prop-types */
import { useDeleteAccountMutation, useGetAccountsQuery,useAddAccountMutation ,useUpdateAccountMutation} from "../api/adminSlice";


function Admin(){

	const {data, isLoading ,isSuccess} = useGetAccountsQuery();
	const [addAccount] = useAddAccountMutation();
	const [deleteAccount] = useDeleteAccountMutation();
	const [updateAccount] = useUpdateAccountMutation();
	return (
		<>
			<h2 className='head-color'> Admin Component</h2>
			{ isLoading?<p>Loading ...</p>:null}
			{
				isSuccess && data && data.map(account=> <p key={account.id}> {account.id} : {account.amount}

				<button className='btn' onClick={()=>{ deleteAccount(account.id)}  }>
				Delete Account</button>
				<button className='btn' onClick={()=>{ updateAccount({id:account.id,amount:777})}  }>
				Delete Account</button>
				</p> )
			}
			<button className='btn' onClick={()=>{addAccount(150 ,data.length+1)} }>
				ADD NEW ACCOUNT
			</button>
		</>
	);
}


export default Admin;
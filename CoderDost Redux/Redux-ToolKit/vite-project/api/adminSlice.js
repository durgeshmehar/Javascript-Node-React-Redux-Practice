/* eslint-disable react/prop-types */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
	reducerPath: 'admin',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		getAccounts: builder.query({
			query: () => `accounts`,
			transformResponse: (response) => response.sort((a, b) => {
				if (b.amount === a.amount) {
					return b.id - a.id;
				}
				return b.amount - a.amount;
			}),
			providesTags: ['Account'],
		}),
		addAccount: builder.mutation({
			query: (amount ,id) => ({
				url: `accounts`,
				method: 'POST',
				body :{amount ,id} 
				}),
			invalidatesTags: ['Account'],
		}),
		deleteAccount: builder.mutation({
			query: (id) => ({
				url: `accounts/${id}`,
				method: 'DELETE',
				}),
			invalidatesTags: ['Account'],
		}),
		updateAccount: builder.mutation({
			query: ( {id,amount} ) => ({
				url: `accounts/${id}`,
				method: 'PATCH',
				body:{amount}
				}),
			invalidatesTags: ['Account'],
		}),

	}),
  })

  export const { useGetAccountsQuery ,useAddAccountMutation ,useDeleteAccountMutation ,useUpdateAccountMutation } = adminApi
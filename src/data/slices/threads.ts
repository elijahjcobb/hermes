/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from "../User";
import {Message} from "../Message";

type threadsState = {
	selectedThread: User | undefined,
	threads: {
		[userId: string]: Message[];
	},
	users: {
		[userId: string]: User;
	}
};

const initialState: threadsState = {selectedThread: undefined, threads: {}, users: {}};

const threadsSlice = createSlice({
	name: "threads",
	initialState,
	reducers: {
		createNewThread: (state, action: PayloadAction<User>) => {
			const id = action.payload.id
			state.threads = {
				...state.threads,
				[id]: []
			}
			state.users = {
				...state.users,
				[id]: action.payload
			}
		}

	}
});

export const threadsSliceActions = threadsSlice.actions
export const threadsSliceReducer = threadsSlice.reducer
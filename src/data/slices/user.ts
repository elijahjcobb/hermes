/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from "../User";

type userState = { user: User | undefined };

const initialState: userState = {user: undefined};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		}
	}
});

export const userSliceActions = userSlice.actions
export const userSliceReducer = userSlice.reducer
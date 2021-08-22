/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {configureStore} from "@reduxjs/toolkit";
import React, {FC} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector, Provider} from "react-redux";
import {userSliceReducer} from "./slices/user";
import {threadsSliceReducer} from "./slices/threads";

const store = configureStore({
	reducer: {
		user: userSliceReducer,
		threads: threadsSliceReducer
	}
})

export const Store: FC = props => <Provider store={store}>{props.children}</Provider>;
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export const useStoreSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
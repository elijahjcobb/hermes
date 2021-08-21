/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {createContext, FC, useState} from "react";
import {ThreadView} from "./components/ThreadView";
import "./global.scss";
import {User} from "./data/User";
import {SidebarView} from "./components/SidebarView";
import styles from "./app.module.scss";
import {Message} from "./data/Message";
import {AuthenticationView} from "./components/AuthenticationView";
import * as Parse from "parse";

Parse.initialize("hermesDEV");
//@ts-ignore
Parse.serverURL = 'https://api.elijahcobb.com/hermesDEV'

export interface AppProps {
	user: User;
	selectedThread: User;
	threads: Map<User, Message[]>
	setUser: (value: User) => void;
	createNewThread: (value: User) => void;
}

export const AppContext = createContext<Partial<AppProps>>({});

export const App: FC = () => {

	// @ts-ignore
	const [context, setContext] = useState<Partial<AppProps>>({
		threads: new Map(),
		setUser: user => setContext((c: any) => {return {...c, user}}),
		createNewThread: user => setContext((c: { threads: { set: (arg0: User, arg1: never[]) => any; }; }) => {return {...c, threads: c.threads?.set(user, [])}}),
	});

	return (<AppContext.Provider value={context}>
		{!context.user && <AuthenticationView/>}
		{context.user && <div className={styles.app}>
            <SidebarView/>
			{context.selectedThread && <ThreadView user={context.selectedThread}/>}
        </div>}
	</AppContext.Provider>);

}

/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {createContext, FC, useContext, useState} from "react";
import {ThreadView} from "./components/ThreadView";
import "./global.scss";
import {SidebarView} from "./components/SidebarView";
import styles from "./app.module.scss";
import {AuthenticationView} from "./components/AuthenticationView";
import * as Parse from "parse";
import {User} from "./data/User";
import {Message} from "./data/Message";

Parse.initialize("hermesDEV");
//@ts-ignore
Parse.serverURL = 'https://api.elijahcobb.com/hermesDEV'

type MessagesStore = {[key: string]: {user: User, messages: Message[]}};

function useMessagesState(): [MessagesStore, (message: Message, user: User) => void, (user: User) => void] {
	const [store, setStore] = useState<MessagesStore>({});
	return [store, (msg, user) => {
		setStore(p => {
			const id = user.id;
			const oldMessages = p[id] ?? [];
			let newMessages = [...oldMessages.messages, msg];
			return {
				...p,
				[id]: {
					...p[id],
					messages: newMessages
				}
			}
		})
	}, user => {
		setStore(p => {
			return {
				...p,
				[user.id]: {
					user,
					messages: []
				}
			}
		})
	}];
}

export interface AppContextConfig {
	user: User | undefined;
	setUser: (value: User) => void;
	selectedThread: User | undefined;
	setSelectedThread: (thread: User) => void;
	store: MessagesStore,
	addMessage: (message: Message, user: User) => void,
	createThread: (user: User) => void;
}

export const AppContext = createContext<AppContextConfig>({} as AppContextConfig)

export function useAppContext() {
	return useContext(AppContext);
}

export const App: FC = () => {

	const [user, setUser] = useState<User | undefined>(undefined);
	const [selectedThread, setSelectedThread] = useState<User | undefined>(undefined);
	const [messages, addMessage, createThread] = useMessagesState();

	return (<AppContext.Provider value={{
		user, setUser, selectedThread, setSelectedThread, store: messages, addMessage, createThread
	}}>
		{!user && <AuthenticationView/>}
		{user && <div className={styles.app}>
            <SidebarView/>
			{selectedThread && <ThreadView user={selectedThread}/>}
        </div>}
	</AppContext.Provider>);

}

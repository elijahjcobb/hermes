/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useContext} from "react";
import styles from "./ThreadsListView.module.scss";
import {ThreadsListRowView} from "./ThreadsListRowView";
import {User} from "../data/User";
import {useStoreDispatch, useStoreSelector} from "../data/Store";
import {threadsSliceActions} from "../data/slices/threads";

export interface ThreadsListViewProps {

}

export const ThreadsListView: FC<ThreadsListViewProps> = props => {

	const dispatch = useStoreDispatch();
	const context = useStoreSelector(s => s.threads.threads);
	const users = useStoreSelector(s => s.threads.users);

	function handleAdd() {
		const username = prompt("User name");
		(async () => {
			if (!username) return;
			const user = await User.getUserByUsername(username);
			console.log(user);
			if (!user) return;
			dispatch(threadsSliceActions.createNewThread(user));
		})().catch(console.error);
	}

	return (<div className={styles.ThreadsListView}>
		<div>
			<span className={styles.title}>Threads</span>
			<button onClick={handleAdd}>Add</button>
		</div>
		<div className={styles.threads}>
			{Object.keys(context).map((userId, i) => {
				return <ThreadsListRowView user={users[userId]} key={i}/>
			})}
		</div>
	</div>);

}

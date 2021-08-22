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
import {useAppContext} from "../App";

export interface ThreadsListViewProps {

}

export const ThreadsListView: FC<ThreadsListViewProps> = props => {

	const context = useAppContext();

	function handleAdd() {
		const username = prompt("User name");
		(async () => {
			if (!username) return;
			const user = await User.getUserByUsername(username);
			console.log(user instanceof User);
			if (!user) return;
			console.log(user.get("firstName"));
			context.createThread(user);
			handleSelectUser(user);
		})().catch(console.error);
	}

	function handleSelectUser(user: User): void {
		context.setSelectedThread(user);
	}

	return (<div className={styles.ThreadsListView}>
		<div>
			<span className={styles.title}>Threads</span>
			<button onClick={handleAdd}>Add</button>
		</div>
		<div className={styles.threads}>
			{Object.keys(context.store).map((userId, i) => {
				const user = context.store[userId].user;
				return <ThreadsListRowView onClick={() => handleSelectUser(user)} user={user} key={i}/>
			})}
		</div>
	</div>);

}

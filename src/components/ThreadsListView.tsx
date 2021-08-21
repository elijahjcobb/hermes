/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useContext} from "react";
import styles from "./ThreadsListView.module.scss";
import {ThreadsListRowView} from "./ThreadsListRowView";
import {AppContext} from "../App";
import {User} from "../data/User";

export interface ThreadsListViewProps {

}

export const ThreadsListView: FC<ThreadsListViewProps> = props => {

	const context = useContext(AppContext);

	function handleAdd() {
		const userid = prompt("User Id");
		(async () => {
			if (!userid) return;
			const user = await User.getUserById(userid);
			if (!user) return;
			if (context.createNewThread) context.createNewThread(user);
		})().catch(console.error);
	}

	return (<div className={styles.ThreadsListView}>
		<div>
			<span className={styles.title}>Threads</span>
			<button onClick={handleAdd}>Add</button>
		</div>
		<div className={styles.threads}>
			{(Array.from(context.threads?.keys() ?? []) ).map((user, i) => {
				return <ThreadsListRowView user={user} key={i}/>
			})}
		</div>
	</div>);

}

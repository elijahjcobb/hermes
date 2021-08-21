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

export interface ThreadsListViewProps {

}

export const ThreadsListView: FC<ThreadsListViewProps> = props => {

	const context = useContext(AppContext);

	return (<div className={styles.ThreadsListView}>
		<span className={styles.title}>Threads</span>
		<div className={styles.threads}>
			{(Array.from(context.threads?.keys() ?? []) ).map((user, i) => {
				return <ThreadsListRowView user={user} key={i}/>
			})}
		</div>
	</div>);

}

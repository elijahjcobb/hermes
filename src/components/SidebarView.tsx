/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "./SidebarView.module.scss";
import {ThreadsListView} from "./ThreadsListView";
import {AvatarView} from "./AvatarView";
import {useAppContext} from "../App";

export interface SidebarViewProps {

}

export const SidebarView: FC<SidebarViewProps> = () => {

	const context = useAppContext();
	if (!context.user) throw new Error("No user even though showing sidebar.");
	const user = context.user;

	return (<div className={styles.SidebarView}>
		<span className={styles.title}>hermes</span>
		<div className={styles.profile}>
			<AvatarView name={user.getAvatar()} size={96}/>
			<span className={styles.name}>{user.getFullName()}</span>
			<span className={styles.username}>{user.getUsername()}</span>
		</div>
		<ThreadsListView/>
	</div>);

}

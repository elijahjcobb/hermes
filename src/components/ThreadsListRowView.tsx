/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "./ThreadsListRowView.module.scss";
import {User} from "../data/User";
import {AvatarView} from "./AvatarView";
import {useStoreSelector} from "../data/Store";
export interface ThreadsListRowViewProps {
	user: User;
	onClick?: () => void;
}

export const ThreadsListRowView: FC<ThreadsListRowViewProps> = props => {

	const context = useStoreSelector(s => s.threads);
	const isSelected = context.selectedThread?.id === props.user.id && context.selectedThread?.id !== undefined;

	return (<div onClick={props.onClick} className={styles.ThreadsListRowView + " " + (isSelected ? styles.selected : "")}>
		<AvatarView name={props.user.getAvatar()}/>
		<span className={styles.name}>{props.user.getFullName()}</span>
	</div>);

}

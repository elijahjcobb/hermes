/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {Message} from "../data/Message";
import styles from "./MessageView.module.scss";
import {AvatarView} from "./AvatarView";
import {useAppContext} from "../App";

export interface MessageProps {
	message: Message;
}

export const MessageView: FC<MessageProps> = props => {

	const context = useAppContext();
	const user = props.message.get("sender");
	const isSender = context.user?.id !== props.message.get("sender").id;

	return (<div className={styles.MessageView} style={{flexDirection: isSender ? "row-reverse" : "row"}}>
		<div className={styles.main} style={{alignItems: isSender ? "flex-start" : "flex-end"}}>
			<span className={styles.message}>{props.message.get("value")}</span>
			<span className={styles.time}>{props.message.createdAt.toLocaleTimeString()}</span>
		</div>
		<AvatarView name={user.getAvatar()}/>
	</div>);

}

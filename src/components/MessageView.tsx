/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useContext} from "react";
import {Message} from "../data/Message";
import styles from "./MessageView.module.scss";
import {AppContext} from "../App";
import {AvatarView} from "./AvatarView";

export interface MessageProps {
	message: Message;
}

export const MessageView: FC<MessageProps> = props => {

	const user = props.message.get("sender");
	const context = useContext(AppContext);
	const isSender = context.user?.id === props.message.id;

	function getMessage(): string {
		let msg = props.message.get("value");
		for (let i = 0; i < Math.floor(Math.random() * 10); i++) msg += " " + msg;
		return msg;
	}

	return (<div className={styles.MessageView} style={{flexDirection: isSender ? "row-reverse" : "row"}}>
		<div className={styles.main} style={{alignItems: isSender ? "flex-start" : "flex-end"}}>
			<span className={styles.message}>{getMessage()}</span>
			<span className={styles.time}>{"3:55 PM"}</span>
		</div>
		<AvatarView name={user.getAvatar()}/>
	</div>);

}

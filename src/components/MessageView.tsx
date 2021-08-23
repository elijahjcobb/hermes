/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import {Message} from "../data/Message";
import styles from "./MessageView.module.scss";
import {AvatarView} from "./AvatarView";
import {useAppContext} from "../App";

export interface MessageProps {
	message: Message;
	avatarColors: string;
}

export const MessageView: FC<MessageProps> = props => {

	const context = useAppContext();
	const user = props.message.get("sender");
	const isReceiver = context.user?.id !== props.message.get("sender").id;

	const [showTime, setShowTime] = useState(false)

	function parseMsg(): string {
		const 	msg    = props.message.get("value")
		const 	words  = msg.split(" ")
		let   	newMsg: string[] = []
		let 	length = 0
		for (const word of words) {
			if (length >= 32) {
				newMsg.push("\n")
				length = 0
			}
			newMsg.push(word + " ")
			length += word.length
		}
		return newMsg.join("")
	}

	const msg = parseMsg();

	function handleOnClick() {
		navigator.clipboard.writeText(msg).catch(console.error)
	}

	return (<div onClick={handleOnClick} className={styles.MessageView} style={{flexDirection: isReceiver ? "row-reverse" : "row"}}>
		<div className={styles.main} style={{alignItems: isReceiver ? "flex-start" : "flex-end"}}>
			<span
				onMouseEnter={() => setShowTime(true)}
				onMouseLeave={() => setShowTime(false)}
				className={styles.message}
				style={{background: isReceiver ? "gray" : "dodgerblue"}}>{msg}</span>
			<span style={{height: showTime ? "32px" : 0}} className={styles.time}>{props.message.createdAt.toLocaleTimeString()}</span>
		</div>
		<AvatarView colour={isReceiver ? props.avatarColors : "gray"} name={user.getAvatar()}/>
	</div>);

}

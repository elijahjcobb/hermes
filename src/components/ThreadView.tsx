/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import {MessageView} from "./MessageView";
import {User} from "../data/User";
import styles from "./ThreadView.module.scss";
import {useStoreSelector} from "../data/Store";

export interface ThreadProps {
	user: User;
}

export const ThreadView: FC<ThreadProps> = props => {

	const [message, setMessage] = useState("");
	const threads = useStoreSelector(s => s.threads.threads)
	const messages = threads[props.user.id] ?? [];

	function handleOnCreateNewMessage(): void {
		setMessage("");
	}

	return (<div className={styles.ThreadView}>
		<div className={styles.thread}>
			{messages.map((message, i) => {
				return <MessageView message={message} key={i}/>
			})}
		</div>
		<div className={styles.inputView}>
			<input
				onKeyDown={e => {
					if (e.key === "Enter") {
						e.preventDefault();
						handleOnCreateNewMessage();
					}
				}}
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder={"Enter your message here"}
				className={styles.field}
			/>
			<button
				onClick={handleOnCreateNewMessage}
				className={styles.button}
			>Send</button>
		</div>
	</div>);

}

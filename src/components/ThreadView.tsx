/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {MessageView} from "./MessageView";
import {User} from "../data/User";
import styles from "./ThreadView.module.scss";
import {AppContext, useAppContext} from "../App";
import {Message} from "../data/Message";
import * as Parse from "parse";

export interface ThreadProps {
	user: User;
}

export const ThreadView: FC<ThreadProps> = props => {

	const [message, setMessage] = useState("");
	const [connected, setConnected] = useState(false);
	const context = useAppContext();
	const messages = context.store[props.user.id];

	useEffect(() => {
		if (!context.user) throw new Error("Trying to send message but not signed in.");
		const q = new Parse.Query<Message>(Message);
		q.equalTo("sender", context.user);
		q.equalTo("receiver", props.user);
		q.subscribe().then(s => {

			s.on("open", () => {
				setConnected(true);
				console.log("Connected!");
			})

			s.on("close", () => {
				setConnected(false);
				console.log("Disconnected!");
			})

			s.on("create", msg => {
				console.log(msg);
				//@ts-ignore
				context.addMessage(msg, props.user);
			});

		});
	}, []);

	function handleOnCreateMessage() {
		if (!context.user) throw new Error("Trying to send message but not signed in.");
		const newMessage = new Message({
			value: message,
			sender: context.user,
			receiver: props.user
		});
		console.log("Will save message.");
		newMessage.save().then(msg => {
			console.log("Did save message. " + msg.id);
			context.addMessage(msg, props.user);
			setMessage("");
		}).catch(console.error);
	}

	return (<div className={styles.ThreadView}>
		<div className={styles.thread}>
			{messages.messages.map((message, i) => {
				return <MessageView message={message} key={i}/>
			})}
		</div>
		<div className={styles.inputView}>
			<input
				onKeyDown={e => {
					if (e.key === "Enter") {
						e.preventDefault();
						handleOnCreateMessage();
					}
				}}
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder={`Enter your message here... (${connected ? "online" : "offline"})`}
				className={styles.field}
			/>
			<button
				onClick={handleOnCreateMessage}
				className={styles.button}
			>Send</button>
		</div>
	</div>);

}

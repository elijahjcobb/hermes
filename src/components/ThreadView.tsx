/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {MessageView} from "./MessageView";
import {User} from "../data/User";
import styles from "./ThreadView.module.scss";
import {AppContext, useAppContext} from "../App";
import {Message} from "../data/Message";
import * as Parse from "parse";

export interface ThreadProps {
	user: User;
}

function randomColor(): string {
	let colors = [
		"red",
		"dodgerblue",
		"orange",
		"green",
		"pink",
		"purple"
	]
	return colors[Math.floor(Math.random() * colors.length)];
}


export const ThreadView: FC<ThreadProps> = props => {

	const [message, setMessage] = useState("");
	const [connected, setConnected] = useState(false);
	const context = useAppContext();
	const messages = context.store[props.user.id];
	const theme = useRef(randomColor());

	useEffect(() => {
		if (!context.user) throw new Error("Trying to send message but not signed in.");
		const q = new Parse.Query<Message>(Message);
		q.containedIn("sender", [props.user, context.user]);
		q.containedIn("receiver", [props.user, context.user]);
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
				console.log("create", msg);
				(async () => {
					console.log(msg);
					if (!context.user) throw new Error("User not signed in.");
					const value = await context.user.decrypt(msg.get("value"));
					msg.set("value", value);
					//@ts-ignore
					context.addMessage(msg, props.user);
				})().catch(console.error)
			});

		});
	}, []);

	function handleOnCreateMessage() {
		(async () => {
			if (!context.user) throw new Error("Trying to send message but not signed in.");
			const msg = await props.user.encrypt(message);
			const newMessage = new Message({
				value: msg,
				sender: context.user,
				receiver: props.user
			});
			console.log("Will save message.");
			await newMessage.save();
			newMessage.set("value", message);
			console.log("Did save message. " + newMessage.id);
			context.addMessage(newMessage, props.user);
			setMessage("");
		})().catch(console.error);
	}

	const messageList = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const list = messageList.current;
		if (!list) return;
		list.scrollTop = list.scrollHeight;
	}, [messages.messages])

	return (<div className={styles.ThreadView}>
		<div className={styles.thread} ref={messageList}>
			{messages.messages.map((message, i) => {
				return <MessageView avatarColors={theme.current} message={message} key={i}/>
			})}
		</div>
		<div className={styles.inputView}>
			<input
				onKeyDown={e => {
					if (e.key === "Enter") {
						e.preventDefault();
						if (message.trim() === "") return;
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

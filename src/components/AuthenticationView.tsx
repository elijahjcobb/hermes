/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "./AuthenticationView.module.scss";
import {Crypto} from "../crypto";
import {User} from "../data/User";
import * as Parse from "parse";
import {useStoreDispatch} from "../data/Store";
import {userSliceActions} from "../data/slices/user";

export const AuthenticationSignInView: FC<{
	username: string;
	setUsername: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
}> = props => {
	return <div className={styles.form}>
		<input type={"username"} value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder={"Username"}/>
		<input type="password"  value={props.password} onChange={e => props.setPassword(e.target.value)} placeholder={"Password"}/>
	</div>
}

export const AuthenticationSignUpView: FC<{
	firstName: string;
	setFirstName: (value: string) => void;
	lastName: string;
	setLastName: (value: string) => void;
	username: string;
	setUsername: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
}> = props => {
	return <div className={styles.form}>
		<input type={"text"} value={props.firstName} onChange={e => props.setFirstName(e.target.value)} placeholder={"First Name"}/>
		<input type={"text"} value={props.lastName} onChange={e => props.setLastName(e.target.value)} placeholder={"Last Name"}/>
		<input type={"username"} value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder={"Username"}/>
		<input type="password"  value={props.password} onChange={e => props.setPassword(e.target.value)} placeholder={"Password"}/>
	</div>
}

export const AuthenticationView: FC = () => {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSignIn, setIsSignIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useStoreDispatch();

	function handleSignUp(): void {
		setIsLoading(true);
		(async () => {
			await User.logOut();
			const keys = await Crypto.generateKeyPair();
			const decryptedPrivateKey = await Crypto.stringFromPrivateKey(keys.privateKey);
			const encryptedPrivateKey = await Crypto.encrypt(decryptedPrivateKey, password);
			if (!encryptedPrivateKey) throw new Error("Failed to encrypt private key.");
			const newUser = new User({
				firstName,
				lastName,
				publicKey: await Crypto.stringFromPublicKey(keys.publicKey),
				privateKey: encryptedPrivateKey
			});
			newUser.setUsername(username);
			newUser.setPassword(password);
			await newUser.signUp();
			dispatch(userSliceActions.setUser(newUser));
		})().catch(console.error);
	}

	function handleSignIn(): void {
		setIsLoading(true);
		(async () => {
			await Parse.User.logOut();
			const user = await User.logIn<User>(username, password);
			await user.decryptPrivateKey(password);
			dispatch(userSliceActions.setUser(user));
		})().catch(console.error);
	}

	return (<div className={styles.AuthenticationView}>
		{!isLoading && <div className={styles.modal}>
            <span className={styles.title}>hermes</span>
			{isSignIn ? <AuthenticationSignInView
				username={username}
				password={password}
				setUsername={setUsername}
				setPassword={setPassword}
			/> : <AuthenticationSignUpView
				firstName={firstName}
				lastName={lastName}
				username={username}
				password={password}
				setFirstName={setFirstName}
				setLastName={setLastName}
				setUsername={setUsername}
				setPassword={setPassword}
			/>}
            <div className={styles.buttons}>
                <button onClick={() => setIsSignIn(v => !v)} className={styles.otherButton}>or Sign {isSignIn ? "Up" : "In"}</button>
                <button onClick={isSignIn ? handleSignIn : handleSignUp} className={styles.mainButton}>Sign {isSignIn ? "In" : " Up"}</button>
            </div>
        </div>}
		{isLoading && <span>Loading...</span>}
	</div>);

}

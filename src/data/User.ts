/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import Parse from "parse";
import {Crypto} from "../crypto";
import {pki} from "node-forge";

export interface UserProps {
	firstName: string;
	lastName: string;
	publicKey: string;
	privateKey: string;
}

export class User extends Parse.User<UserProps> {

	private decryptedPrivateKey: pki.rsa.PrivateKey | undefined;
	private publicKey: pki.rsa.PublicKey | undefined;

	public constructor(defaultProps: UserProps) {
		super(defaultProps);
	}

	public getAvatar(): string {
		return this.get("firstName").charAt(0) + this.get("lastName").charAt(0);
	}

	public getFullName(): string {
		return this.get("firstName") + " " + this.get("lastName");
	}

	public async decryptPrivateKey(password: string): Promise<void> {
		const encryptedPrivateKey = this.get("privateKey");
		const decrypted = await Crypto.decrypt(encryptedPrivateKey, password);
		if (!decrypted) throw new Error("Failed to decrypt private key.");
		this.decryptedPrivateKey = await Crypto.privateKeyFromString(decrypted);
		this.publicKey = await Crypto.publicKeyFromString(this.get("publicKey"));
	}

	public async encrypt(value: string): Promise<string> {
		if (!this.publicKey) throw new Error("Tried to encrypt a message before public key is configured.");
		return this.publicKey.encrypt(value);
	}

	public async decrypt(value: string): Promise<string> {
		if (!this.decryptedPrivateKey) throw new Error("Tried to decrypt a message before private key is decrypted.");
		return this.decryptedPrivateKey.decrypt(value);
	}

	public static async getUserByUsername(username: string): Promise<User | undefined> {
		const query = new Parse.Query(User);
		// @ts-ignore
		query.equalTo("username", username);
		return await query.first();
	}

	public static async getUserById(userId: string): Promise<User | undefined> {
		const query = new Parse.Query(User);
		return await query.get(userId);
	}
}

Parse.Object.registerSubclass("_User", User);
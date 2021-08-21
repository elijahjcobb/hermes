/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as Forge from "node-forge";
const RSA = Forge.pki.rsa;

const BYTE_DELIMITER: string = ".";
const ITEM_DELIMITER: string = ",";

async function generateKey(password: Uint8Array): Promise<CryptoKey> {
	const hash: ArrayBuffer = await window.crypto.subtle.digest({name: "SHA-256"}, password);
	return await window.crypto.subtle.importKey("raw", hash, {name: "AES-CBC"}, false,["encrypt", "decrypt"]);
}

function dataArrayToString(value: Uint8Array): string {
	return value.join(BYTE_DELIMITER);
}

function stringToDataArray(value: string): Uint8Array {
	return new Uint8Array(value.split(BYTE_DELIMITER).map(num => parseInt(num)));
}

export abstract class Crypto {

	private constructor() {}

	public static generateKeyPair(): Promise<Forge.pki.rsa.KeyPair> {
		return new Promise((resolve, reject) => {
			RSA.generateKeyPair(undefined, (err, keypair) => {
				if (err) return reject(err);
				resolve(keypair);
			});
		});
	}

	public static async publicKeyFromString(value: string): Promise<Forge.pki.rsa.PublicKey> {
		return Forge.pki.publicKeyFromPem(value);
	}

	public static async privateKeyFromString(value: string): Promise<Forge.pki.rsa.PrivateKey> {
		return Forge.pki.privateKeyFromPem(value);
	}

	public static async stringFromPublicKey(value: Forge.pki.rsa.PublicKey): Promise<string> {
		return Forge.pki.publicKeyToPem(value);
	}

	public static async stringFromPrivateKey(value: Forge.pki.rsa.PrivateKey): Promise<string> {
		return Forge.pki.privateKeyToPem(value);
	}

	public static async encrypt(content: string, password: string): Promise<string | undefined> {
		try {
			const encoder = new TextEncoder();
			const dataToEncrypt: Uint8Array = encoder.encode(content)
			const iv: Uint8Array = window.crypto.getRandomValues(new Uint8Array(16));
			const key: CryptoKey = await generateKey(encoder.encode(password));
			const encrypted: Uint8Array = new Uint8Array(await window.crypto.subtle.encrypt({name: "AES-CBC", iv}, key, dataToEncrypt));
			return dataArrayToString(iv) + ITEM_DELIMITER + dataArrayToString(encrypted);
		} catch (e) {
			return undefined;
		}
	}

	public static async decrypt(value: string, password: string): Promise<string | undefined> {
		try {
			const encoder = new TextEncoder();
			const values: string[] = value.split(ITEM_DELIMITER);
			const encrypted = stringToDataArray(values[1]);
			const iv = stringToDataArray(values[0]);
			const key = await generateKey(encoder.encode(password));
			const dec = await window.crypto.subtle.decrypt({name: "AES-CBC", iv}, key, encrypted);
			const decoder = new TextDecoder();
			return decoder.decode(dec);
		} catch (e) {
			return undefined;
		}
	}

}
//
// console.log("HELLO");
//
// const bob = RSA.generateKeyPair();
// const remoteAlice = RSA.generateKeyPair();
//
// const alice = RSA.setPublicKey(remoteAlice.publicKey.n, remoteAlice.publicKey.e);
//
// const msgFromBob = "Hello, Alice!";
// console.log(msgFromBob);
// const encrypted = alice.encrypt(msgFromBob);
// console.log(encrypted);
// const decrypted = remoteAlice.privateKey.decrypt(encrypted);
// console.log(decrypted);

/*
var foo = JSON.stringify({
  publicKeyPem: forge.pki.publicKeyToPem(publicKey),
  privateKeyPem: forge.pki.privateKeyToPem(privateKey)
});

// ...

foo = JSON.parse(foo);
var publicKey = forge.pki.publicKeyFromPem(foo.publicKeyPem);
var privateKey = forge.pki.privateKeyFromPem(foo.privateKeyPem);
 */
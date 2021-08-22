/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import Parse from "parse";
import {User} from "./User";

interface MessageProps {
	value: string;
	sender: User;
	receiver: User;
}

export class Message extends Parse.Object<MessageProps> {

	public constructor(defaultProps: MessageProps) {
		super("Message", defaultProps);
	}

}

Parse.Object.registerSubclass("Message", Message);
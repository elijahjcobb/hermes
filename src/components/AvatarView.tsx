/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useRef} from "react";
import styles from "./AvatarView.module.scss";

export interface AvatarViewProps {
	name: string;
	size?: number;
	colour?: string;
}


export const AvatarView: FC<AvatarViewProps> = props => {

	const size = props.size ?? 64;

	return (<div className={styles.avatar} style={{
		width: size,
		height: size,
		minWidth: size,
		background: props.colour ?? "dodgerblue"
	}}>
		<span style={{
			fontSize: size * 0.4
		}}>{props.name.toUpperCase()}</span>
	</div>);

}

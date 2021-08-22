/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {ThreadView} from "./components/ThreadView";
import "./global.scss";
import {SidebarView} from "./components/SidebarView";
import styles from "./app.module.scss";
import {AuthenticationView} from "./components/AuthenticationView";
import * as Parse from "parse";
import {useStoreSelector} from "./data/Store";

Parse.initialize("hermesDEV");
//@ts-ignore
Parse.serverURL = 'https://api.elijahcobb.com/hermesDEV'

export const App: FC = () => {

	const user = useStoreSelector(s => s.user.user);
	const threads = useStoreSelector(s => s.threads);

	return (<div>
		{!user && <AuthenticationView/>}
		{user && <div className={styles.app}>
            <SidebarView/>
			{threads.selectedThread && <ThreadView user={threads.selectedThread}/>}
        </div>}
	</div>);

}

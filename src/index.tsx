import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App";
import "./crypto";
import {Store} from "./data/Store";

ReactDOM.render(
  <React.StrictMode>
    <Store>
        <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
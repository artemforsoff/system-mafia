import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import App from './App';
import store from './model/store.js';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

window.__store__ = store.getState();

serviceWorker.unregister();

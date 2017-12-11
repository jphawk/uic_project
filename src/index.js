import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var translation = 'boo';

ReactDOM.render((
	<App/>
), document.getElementById('root'));
registerServiceWorker();

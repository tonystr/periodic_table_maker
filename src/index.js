import React from 'react';
import ReactDOM from 'react-dom';
import './ptable.scss';
import * as serviceWorker from './serviceWorker';
import App from './pages/table.js';

ReactDOM.render(<App />, document.getElementById('root'));

// unregister() / register()  http://bit.ly/CRA-PWA
serviceWorker.unregister();

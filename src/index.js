import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './ptable.scss';
import * as serviceWorker from './serviceWorker';
import PTable from './pages/table.js';
import Login from './pages/login.js';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/table" component={PTable} />
            <Route path="/login" component={Login} />
        </div>
    </Router>,
    document.getElementById('root')
);

// unregister() / register()  http://bit.ly/CRA-PWA
serviceWorker.unregister();

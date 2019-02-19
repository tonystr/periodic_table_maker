import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './ptable.scss';
import * as serviceWorker from './serviceWorker';
import PTable    from './pages/table.js';
import Login     from './pages/login.js';
import SignUp    from './pages/signup.js';
import Dashboard from './pages/dashboard.js'

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/'    component={Login}      />
            <Route path='/login'     component={Login}      />
            <Route path='/dashboard' component={Dashboard}  />
            <Route path='/table'     component={PTable}     />
            <Route path='/signup'    component={SignUp}     />
        </div>
    </Router>,
    document.getElementById('root')
);

// unregister() / register()  http://bit.ly/CRA-PWA
serviceWorker.unregister();

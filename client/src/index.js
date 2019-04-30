import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Required pages for rendering
import Login from './Login';
import Dashboard from './views/dashboard/Dashboard'
var hist = createBrowserHistory();

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
// registerServiceWorker();

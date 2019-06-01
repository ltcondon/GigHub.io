import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import history from './utils/history';

import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import CreateApp from "./components/CreateApp/CreateApp";

// Create history so that user can navigate back using their browser 


const App = () => (
  <HashRouter>
    <div className="mainBody">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard} classes="dashboard"/>
        {/* <Route exact path="/dashboard/myjobs" component={Dashboard} classes="dashboard"/>
        <Route exact path="/dashboard/contacts" component={Dashboard} classes="dashboard"/>
        <Route exact path="/dashboard/companies" component={Dashboard} classes="dashboard"/>
        <Route exact path="/dashboard/analytics" component={Dashboard} classes="dashboard"/>
        <Route path="/add" component={CreateApp} /> */}
      </Switch>
    </div>
  </HashRouter>
);

export default App;
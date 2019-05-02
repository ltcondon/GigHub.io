import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import CreateApp from "./components/CreateApp/CreateApp";

const App = () => (
  <Router>
    <div className="mainBody">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard} classes="dashboard"/>
        <Route path="/add" component={CreateApp} />
      </Switch>
    </div>
  </Router>
);

export default App;
import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';

const App = () => (
  <HashRouter>
    <div className="mainBody">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard} classes="dashboard"/>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
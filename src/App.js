import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import { withAuthLayout } from "./HOCS";
import { Login } from "./containers/login"
import { ROUTE_LOGIN } from "./utils/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
      </Switch>
    </Router>
  );
}

export default App;

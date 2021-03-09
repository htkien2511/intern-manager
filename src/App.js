import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import { withAuthLayout } from "./HOCS";
import { Login } from "./containers/login";
import { Register } from "./containers/register";
import { ROUTE_FORGOTPASSWORD, ROUTE_LOGIN, ROUTE_MANAGEINTERN, ROUTE_REGISTER, ROUTE_RESETPASSWORD } from "./utils/routes";
import { ForgotPassword } from "./containers/forgotPassword";
import { ResetPassword } from "./containers/resetPassword.js";
import { ManageIntern } from "./containers/admin/manageAccountIntern";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
        <Route path={ROUTE_REGISTER} component={withAuthLayout(Register)} exact />
        <Route path={ROUTE_FORGOTPASSWORD} component={withAuthLayout(ForgotPassword)} exact />
        <Route path={ROUTE_RESETPASSWORD} component={withAuthLayout(ResetPassword)} exact />
        {/* Admin */}
        <Route path={ROUTE_MANAGEINTERN} component={withAuthLayout(ManageIntern)} exact />
      </Switch>
    </Router>
  );
}

export default App;

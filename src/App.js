import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import { withAuthLayout } from "./HOCS";
// import withAuthUser  from "./HOCS/intern";
import { Login } from "./containers/login";
import InfoIntern from "./containers/intern/infoIntern/InfoIntern";
import TaskManagement from "./containers/intern/taskManagement/TaskManagement";
import Feedback from "./containers/intern/feedback/Feedback";
import SendFeedback from "./containers/intern/feedback/SendFeedback";
import Conversation from "./containers/intern/feedback/Conversation";
import Calendar from "./containers/intern/calendar/Calendar";


import { ROUTE_LOGIN } from "./utils/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
        <Route path="/infoIntern" component={withAuthLayout(InfoIntern)} exact />
        <Route path="/taskManagement" component={withAuthLayout(TaskManagement)} exact />
        <Route path="/feedback" component={withAuthLayout(Feedback)} exact />
        <Route path="/sendfeedback" component={withAuthLayout(SendFeedback)} exact />
        <Route path="/chatting" component={withAuthLayout(Conversation)} exact />
        <Route path="/calendar" component={withAuthLayout(Calendar)} exact />

      </Switch>
    </Router>
  );
}

export default App;

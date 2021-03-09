import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import { withAuthLayout } from "./HOCS";
import  withAuthUser   from "./HOCS/intern/withAuthUser";
import { Login } from "./containers/login";
import InfoIntern from "./containers/intern/infoIntern/InfoIntern";
import TaskManagement from "./containers/intern/taskManagement/TaskManagement";
import Feedback from "./containers/intern/feedback/Feedback";
import SendFeedback from "./containers/intern/feedback/SendFeedback";
import Conversation from "./containers/intern/feedback/Conversation";
import Calendar from "./containers/intern/calendar/Calendar";


import { ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_CONVERSATION, ROUTE_FEEDBACKS, ROUTE_REGISTER_SCHEDULE, ROUTE_TASK_MANAGEMENT, ROUTE_SEND_FEEDBACK } from "./utils/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
        <Route path={ROUTE_PROFILE} component={withAuthUser(InfoIntern)} exact />
        <Route path={ROUTE_TASK_MANAGEMENT} component={withAuthUser(TaskManagement)} exact />
        <Route path={ROUTE_FEEDBACKS} component={withAuthUser(Feedback)} exact />
        <Route path={ROUTE_SEND_FEEDBACK} component={withAuthUser(SendFeedback)} exact />
        <Route path={ROUTE_CONVERSATION} component={withAuthUser(Conversation)} exact />
        <Route path={ROUTE_REGISTER_SCHEDULE} component={withAuthUser(Calendar)} exact />

      </Switch>
    </Router>
  );
}

export default App;

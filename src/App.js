import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import withAuthUser from "./HOCS/intern/withAuthUser";
import { withAuth, withAuthLayout } from "./HOCS";
import {
  ROUTE_FORGOTPASSWORD, ROUTE_LOGIN, ROUTE_MANAGE_INTERN, ROUTE_REGISTER, ROUTE_RESETPASSWORD, ROUTE_ADMIN_LOGIN,
  ROUTE_MANAGE_SCHEDULE, ROUTE_MANAGE_SCHEDULE_DETAIL, ROUTE_MANAGE_LEADER, ROUTE_MANAGE_TASK, ROUTE_MANAGE_ACCOUNT_WAITING,
  ROUTE_PROFILE, ROUTE_EDIT_PROFILE, ROUTE_CONVERSATION, ROUTE_FEEDBACKS, ROUTE_REGISTER_SCHEDULE, ROUTE_TASK_MANAGEMENT, ROUTE_SEND_FEEDBACK, ROUTE_VIEW_STATISTIC, ROUTE_MANAGE_FEEDBACK__INTERN
} from "./utils/routes";
import { ForgotPassword } from "./containers/forgotPassword";
import { ResetPassword } from "./containers/resetPassword";
import { ManageIntern } from "./containers/admin/manageAccountIntern";
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import InfoIntern from "./containers/intern/infoIntern/InfoIntern";
import EditProfile from "./containers/intern/infoIntern/EditProfile";
import TaskManagement from "./containers/intern/taskManagement/TaskManagement";
import Feedback from "./containers/intern/feedback/Feedback";
import SendFeedback from "./containers/intern/feedback/SendFeedback";
import Conversation from "./containers/intern/feedback/Conversation";
import Calendar from "./containers/intern/calendar/Calendar";
import { ManageSchedule, ManageScheduleDetail } from "./containers/admin/manageScheduleIntern";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
        <Route path={ROUTE_ADMIN_LOGIN} component={withAuthLayout(Login)} exact />
        <Route path={ROUTE_REGISTER} component={withAuthLayout(Register)} exact />
        <Route path={ROUTE_FORGOTPASSWORD} component={withAuthLayout(ForgotPassword)} exact />
        <Route path={ROUTE_RESETPASSWORD} component={withAuthLayout(ResetPassword)} exact />
        <Route path={ROUTE_PROFILE} component={withAuthUser(InfoIntern)} exact />
        <Route path={ROUTE_EDIT_PROFILE} component={withAuthUser(EditProfile)} exact />
        <Route path={ROUTE_TASK_MANAGEMENT} component={withAuthUser(TaskManagement)} exact />
        <Route path={ROUTE_FEEDBACKS} component={withAuthUser(Feedback)} exact />
        <Route path={ROUTE_SEND_FEEDBACK} component={withAuthUser(SendFeedback)} exact />
        <Route path={ROUTE_CONVERSATION} component={withAuthUser(Conversation)} exact />
        <Route path={ROUTE_REGISTER_SCHEDULE} component={withAuthUser(Calendar)} exact />\
        {/* Admin */}
        <Route path={ROUTE_MANAGE_INTERN} component={withAuth(ManageIntern, false)} exact />
        <Route path={ROUTE_MANAGE_SCHEDULE} component={withAuth(ManageSchedule, false)} exact />
        <Route path={ROUTE_MANAGE_SCHEDULE_DETAIL} component={withAuth(ManageScheduleDetail, false)} exact />
        <Route path={ROUTE_MANAGE_LEADER} component={withAuth(ManageIntern, false)} exact />
        <Route path={ROUTE_MANAGE_TASK} component={withAuth(ManageSchedule, false)} exact />
        <Route path={ROUTE_MANAGE_FEEDBACK__INTERN} component={withAuth(ManageSchedule, false)} exact />
        <Route path={ROUTE_MANAGE_ACCOUNT_WAITING} component={withAuth(ManageSchedule, false)} exact />
        <Route path={ROUTE_VIEW_STATISTIC} component={withAuth(ManageSchedule, false)} exact />
      </Switch>
    </Router>
  );
}

export default App;

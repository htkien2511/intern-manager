import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import withAuthUser from "./HOCS/intern/withAuthUser";
import { withAuth, withAuthLayout } from "./HOCS";
import {
  ROUTE_FORGOTPASSWORD,
  ROUTE_LOGIN,
  ROUTE_MANAGE_INTERN,
  ROUTE_REGISTER,
  ROUTE_RESETPASSWORD,
  ROUTE_ADMIN_LOGIN,
  ROUTE_MANAGE_SCHEDULE,
  ROUTE_MANAGE_SCHEDULE_DETAIL,
  ROUTE_MANAGE_LEADER,
  ROUTE_MANAGE_PROJECT,
  ROUTE_MANAGE_ACCOUNT_WAITING,
  ROUTE_PROFILE,
  ROUTE_EDIT_PROFILE,
  ROUTE_CONVERSATION,
  ROUTE_FEEDBACKS,
  ROUTE_REGISTER_SCHEDULE,
  ROUTE_TASK_MANAGEMENT,
  ROUTE_SEND_FEEDBACK,
  ROUTE_VIEW_STATISTIC,
  ROUTE_TASK_MANAGEMENT_DETAIL,
  ROUTE_MANAGE_PROJECT_DETAIL,
  ROUTE_MANAGE_PERMISSION_LEADER,
  ROUTE_VIEW_STATISTIC_DETAIL,
} from "./utils/routes";
import { ForgotPassword } from "./containers/forgotPassword";
import { ResetPassword } from "./containers/resetPassword";
import { ManageIntern } from "./containers/admin/manageAccountIntern";
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import { LoginAdmin } from "./containers/loginAdmin";
import InfoIntern from "./containers/intern/infoIntern/InfoIntern";
import EditProfile from "./containers/intern/infoIntern/EditProfile";
import TaskManagement from "./containers/intern/taskManagement/TaskManagement";
import TaskManagementDetail from "./containers/intern/taskManagement/TaskManagementDetail";
import Feedback from "./containers/intern/feedback/Feedback";
import SendFeedback from "./containers/intern/feedback/SendFeedback";
import Conversation from "./containers/intern/feedback/Conversation";
import Calendar from "./containers/intern/calendar/Calendar";
import {
  ManageSchedule,
  ManageScheduleDetail,
} from "./containers/admin/manageScheduleIntern";
import {
  ManageProject,
  ManageProjectDetail,
} from "containers/admin/manageProjectIntern";
import { ManageAccountWaiting } from "containers/admin/manageAccountWaiting";
import { ManageLeader } from "containers/admin/manageAccountLeader";
import { ManageViewStatistic } from "containers/admin/manageViewStatistic.js";
import ManagePermissionLeader from "containers/admin/managePermissionLeader.js/ManagePermissionLeader";
import StatisticDetails from "containers/admin/manageViewStatistic.js/StatisticDetails";
import InvalidPage from "components/common/InvalidPage";
import { getAuth } from "utils/helpers";
import { useEffect } from "react";
// import { updatePermissionsLeader } from "redux/actions/login";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { toast } from "react-toastify";
import { updatePermissionsLeader } from "redux/actions/login";

function App() {
  // update permissions for leader when refresh page

  useEffect(() => {
    if (getAuth().role === "ROLE_MANAGER") {
      getProfileIntern(getAuth().id, (res) => {
        if (res.success) {
          const newPermissions = res?.permissionDomains || [];
          if (newPermissions.length) {
            updatePermissionsLeader(newPermissions);
          }
        } else {
          toast.error(res.message);
        }
      });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthLayout(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthLayout(Login)} exact />
        <Route
          path={ROUTE_ADMIN_LOGIN}
          component={withAuthLayout(LoginAdmin)}
          exact
        />
        <Route
          path={ROUTE_REGISTER}
          component={withAuthLayout(Register)}
          exact
        />
        <Route
          path={ROUTE_FORGOTPASSWORD}
          component={withAuthLayout(ForgotPassword)}
          exact
        />
        <Route
          path={ROUTE_RESETPASSWORD}
          component={withAuthLayout(ResetPassword)}
          exact
        />
        <Route
          path={ROUTE_PROFILE}
          component={withAuthUser(InfoIntern)}
          exact
        />
        <Route
          path={ROUTE_EDIT_PROFILE}
          component={withAuthUser(EditProfile)}
          exact
        />
        <Route
          path={ROUTE_TASK_MANAGEMENT}
          component={withAuthUser(TaskManagement)}
          exact
        />
        <Route
          path={ROUTE_FEEDBACKS}
          component={withAuthUser(Feedback)}
          exact
        />
        <Route
          path={ROUTE_SEND_FEEDBACK}
          component={withAuthUser(SendFeedback)}
          exact
        />
        <Route
          path={ROUTE_CONVERSATION}
          component={withAuthUser(Conversation)}
          exact
        />
        <Route
          path={ROUTE_REGISTER_SCHEDULE}
          component={withAuthUser(Calendar)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_LOGIN}
          component={withAuthLayout(Login)}
          exact
        />
        <Route
          path={ROUTE_REGISTER}
          component={withAuthLayout(Register)}
          exact
        />
        <Route
          path={ROUTE_FORGOTPASSWORD}
          component={withAuthLayout(ForgotPassword)}
          exact
        />
        <Route
          path={ROUTE_RESETPASSWORD}
          component={withAuthLayout(ResetPassword)}
          exact
        />
        <Route
          path={ROUTE_PROFILE}
          component={withAuthUser(InfoIntern)}
          exact
        />
        <Route
          path={ROUTE_EDIT_PROFILE}
          component={withAuthUser(EditProfile)}
          exact
        />
        <Route
          path={ROUTE_TASK_MANAGEMENT}
          component={withAuthUser(TaskManagement)}
          exact
        />
        <Route
          path={ROUTE_TASK_MANAGEMENT_DETAIL}
          component={withAuthUser(TaskManagementDetail)}
          exact
        />
        <Route
          path={ROUTE_FEEDBACKS}
          component={withAuthUser(Feedback)}
          exact
        />
        <Route
          path={ROUTE_SEND_FEEDBACK}
          component={withAuthUser(SendFeedback)}
          exact
        />
        <Route
          path={ROUTE_CONVERSATION}
          component={withAuthUser(Conversation)}
          exact
        />
        <Route
          path={ROUTE_REGISTER_SCHEDULE}
          component={withAuthUser(Calendar)}
          exact
        />
        {/* Admin */}
        <Route
          path={ROUTE_MANAGE_INTERN}
          component={withAuth(ManageIntern, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_SCHEDULE}
          component={withAuth(ManageSchedule, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_SCHEDULE_DETAIL}
          component={withAuth(ManageScheduleDetail, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_LEADER}
          component={withAuth(ManageLeader, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_PERMISSION_LEADER}
          component={withAuth(ManagePermissionLeader, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_PROJECT}
          component={withAuth(ManageProject, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_PROJECT_DETAIL}
          component={withAuth(ManageProjectDetail, false)}
          exact
        />
        <Route
          path={ROUTE_MANAGE_ACCOUNT_WAITING}
          component={withAuth(ManageAccountWaiting, false)}
          exact
        />
        <Route
          path={ROUTE_VIEW_STATISTIC}
          component={withAuth(ManageViewStatistic, false)}
          exact
        />
        <Route
          path={ROUTE_VIEW_STATISTIC_DETAIL}
          component={withAuth(StatisticDetails, false)}
          exact
        />
        <Route component={InvalidPage} />
      </Switch>
    </Router>
  );
}

export default App;

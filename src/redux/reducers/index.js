import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import changePassword from "./changePassword";
import getAllUser from "./admin/getAllUser";
import setTitle from "./admin/setTitle";
import setShowSidebar from "./admin/setShowSidebar";
import getProfileIntern from "./intern/getProfileIntern";
import getAllManager from "./admin/getAllManager";
import deleteUser from "./admin/deleteUser";
import getAllAccountWaiting from "./admin/getAllAccountWaiting";
import acceptUserRegister from "./admin/acceptUserRegister";
import deniedUserRegister from "./admin/deniedUserRegister";
import getAllDepartments from "./getAllDepartments";
import updateAccount from "./updateAccount";
import addManager from "./admin/addManager";
import getProjectIntern from "./intern/getProjectIntern";
import getTaskProjectIntern from "./intern/getTaskProjectIntern";
import changeStatusTask from "./intern/changeStatusTask";
import addLeaveSchedule from "./intern/addLeaveSchedule";
import createProject from "./admin/createProject";
import updateProject from "./admin/updateProject";
import deleteProject from "./admin/deleteProject";
import getAllProject from "./admin/getAllProject";
import getAllUsersAssignedProject from "./admin/getAllUsersAssignedProject";
import assignUsersIntoProject from "./admin/assignUsersIntoProject";
import getAllTasksByProjectID from "./admin/getAllTasksByProjectID";
import createTask from "./admin/createTask";
import updateTask from "./admin/updateTask";
import deleteTask from "./admin/deleteTask";
import createSchedule from "./admin/createSchedule";
import updateSchedule from "./admin/updateSchedule";
import deleteSchedule from "./admin/deleteSchedule";
import getScheduleUserID from "./admin/getScheduleUserID";
import addFeedback from "./admin/addFeedback";
import updateFeedback from "./admin/updateFeedback";
import deleteFeedback from "./admin/deleteFeedback";
import getAllFeedbacksByTaskID from "./admin/getAllFeedbacksByTaskID";
import updatePermissionByLeaderID from "./admin/updatePermissionByLeaderID";
import getPermissionLeader from "./admin/getPermissionLeader";
import getAllPermission from "./admin/getAllPermission";

export default combineReducers({
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
  getAllUser,
  setTitle,
  getProfileIntern,
  getAllManager,
  deleteUser,
  getAllAccountWaiting,
  acceptUserRegister,
  deniedUserRegister,
  getAllDepartments,
  updateAccount,
  addManager,
  getProjectIntern,
  getTaskProjectIntern,
  changeStatusTask,
  addLeaveSchedule,
  createProject,
  updateProject,
  deleteProject,
  assignUsersIntoProject,
  getAllUsersAssignedProject,
  getAllProject,
  setShowSidebar,
  getAllTasksByProjectID,
  createTask,
  updateTask,
  deleteTask,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleUserID,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getAllFeedbacksByTaskID,
  updatePermissionByLeaderID,
  getPermissionLeader,
  getAllPermission,
});

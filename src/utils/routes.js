//user
export const ROUTE_PROFILE = "/profile";
export const ROUTE_EDIT_PROFILE = "/editProfile";

export const ROUTE_TASK_MANAGEMENT = "/taskManagement:userId";
export const ROUTE_TASK_MANAGEMENT_DETAIL = "/taskManagement/project:projectId";
// export const ROUTE_TASK_MANAGEMENT_DETAIL = "/taskManagement/project";

export const ROUTE_REGISTER_SCHEDULE = "/registerSchedule";
export const ROUTE_FEEDBACKS = "/feedbacks";
export const ROUTE_SEND_FEEDBACK = "/sendFeedback";
export const ROUTE_CONVERSATION = "/conversation";

//common
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_FORGOTPASSWORD = "/forgot-password";
export const ROUTE_RESETPASSWORD = "/reset-password";
//admin
export const ROUTE_ADMIN_LOGIN = "/admin";
export const ROUTE_MANAGE_INTERN = "/admin/manage-intern";
export const ROUTE_MANAGE_SCHEDULE = "/admin/manage-schedule";
export const ROUTE_MANAGE_SCHEDULE_DETAIL =
  "/admin/manage-schedule/internID=:userId";
export const ROUTE_MANAGE_LEADER = "/admin/manage-leader";
export const ROUTE_MANAGE_PROJECT = "/admin/manage-project";
export const ROUTE_MANAGE_PROJECT_DETAIL =
  "/admin/manage-project/projectID=:projectId";
export const ROUTE_MANAGE_FEEDBACK__INTERN = "/admin/manage-feedback";
export const ROUTE_MANAGE_FEEDBACK__INTERN_DETAIL =
  "/admin/manage-feedback:userId";
export const ROUTE_MANAGE_ACCOUNT_WAITING = "/admin/manage-account-waiting";
export const ROUTE_VIEW_STATISTIC = "/admin/view-statistic";
export const ROUTE_VIEW_STATISTIC_DETAIL = "/admin/view-statistic:userId";
export const ROUTE_MANAGE_PERMISSION_LEADER = "/admin/manage-permission-leader";

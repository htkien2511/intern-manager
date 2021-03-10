import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import getUser from "./admin/getUser";

export default combineReducers({
  login, register, forgotPassword, resetPassword, getUser
});

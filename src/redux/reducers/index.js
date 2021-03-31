import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import getUser from "./admin/getUser";
import setTitle from "./admin/setTitle";

export default combineReducers({
  login, register, forgotPassword, resetPassword, getUser, setTitle
});

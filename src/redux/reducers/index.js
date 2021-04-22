import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import getAllUser from "./admin/getAllUser";
import setTitle from "./admin/setTitle";
import getProfileIntern from "./intern/getProfileIntern";
import getAllManager from "./admin/getAllManager";


export default combineReducers({
  login, register, forgotPassword, resetPassword, getAllUser, setTitle, getProfileIntern,getAllManager
});

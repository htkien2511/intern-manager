import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import getAllUser from "./admin/getAllUser";
import setTitle from "./admin/setTitle";
import getProfileIntern from "./intern/getProfileIntern";
import getAllManager from "./admin/getAllManager";
import deleteUser from "./admin/deleteUser";
import getAllAccountWaiting from "./admin/getAllAccountWaiting";
import acceptUserRegister from "./admin/acceptUserRegister";
import deniedUserRegister from "./admin/deniedUserRegister";
import getAllDepartments from "./getAllDepartments";
import updateAccount from "./updateAccount";
import addManager from "./admin/addManager";

export default combineReducers({
  login,
  register,
  forgotPassword,
  resetPassword,
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
});

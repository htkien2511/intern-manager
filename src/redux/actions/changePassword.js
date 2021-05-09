import * as types from "../constants";
import { getAuth } from "../../utils/helpers";
import store from "../store";
export function changePassword(data, resolve = () => {}) {
  store.dispatch({
    type: types.CHANGEPASSWORD_API,
  });
  var details = {
    old_password: data.oldPassword,
    new_password: data.newPassword,
  };

  return fetch(`${process.env.REACT_APP_API_URL}change-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuth().token,
    },
    body: JSON.stringify(details),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.CHANGEPASSWORD_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.CHANGEPASSWORD_API_FAIL,
      });
    });
}

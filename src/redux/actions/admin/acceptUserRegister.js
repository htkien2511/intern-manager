import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function acceptUserRegister(arr_user_id, resolve = () => {}) {
  store.dispatch({
    type: types.ACCEPT_USER_REGISTER,
  });
  return fetch(`${process.env.REACT_APP_API_URL}user/accept`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuth().token,
    },
    body: JSON.stringify(arr_user_id),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ACCEPT_USER_REGISTER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ACCEPT_USER_REGISTER_FAILED,
      });
    });
}

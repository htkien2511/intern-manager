import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function deleteUser(id_user, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_USER,
  });
  var details = {
    id_user: id_user,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(`${process.env.REACT_APP_API_URL}user/delete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: getAuth().token,
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.DELETE_USER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_USER_FAILED,
      });
    });
}

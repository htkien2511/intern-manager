import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getPermissionLeader(manager_id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_PERMISSIONS_BY_LEADER_ID,
  });

  var details = {
    manager_id: manager_id,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(`${process.env.REACT_APP_API_URL}permission`, {
    method: "GET",
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
        type: types.GET_PERMISSIONS_BY_LEADER_ID_SUCCEED,
      });
    })
    .catch((error) => {
      console.log(error);
      store.dispatch({
        payload: error,
        type: types.GET_PERMISSIONS_BY_LEADER_ID_FAILED,
      });
    });
}

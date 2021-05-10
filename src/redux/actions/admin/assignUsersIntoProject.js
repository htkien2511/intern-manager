import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function assignUsersIntoProject(input, resolve = () => {}) {
  store.dispatch({
    type: types.ASSIGN_USERS_INTO_PROJECT,
  });
  var details = {
    id_project: input.id_project,
    id_user: input.id_user,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(`${process.env.REACT_APP_API_URL}project/assign_user`, {
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
        type: types.ASSIGN_USERS_INTO_PROJECT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ASSIGN_USERS_INTO_PROJECT_FAILED,
      });
    });
}

import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function deleteTask(id_task, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_TASK,
  });

  var details = {
    id_task: id_task,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return fetch(`${process.env.REACT_APP_API_URL}task/delete`, {
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
        type: types.DELETE_TASK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_TASK_FAILED,
      });
    });
}

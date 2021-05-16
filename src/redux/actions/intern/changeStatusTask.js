import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function changeStatusTask(input, resolve = () => {}) {
  store.dispatch({
    type: types.CHANGE_STATUS_TASK_INTERN,
  });
  var details = {
    task_id: input.task_id,
    description: input.description,
    title: input.title,
    difficulty: input.difficulty,
    is_done: input.is_done,
    point: input.point,
    due_date: input.due_date,
    users_assignee: input.users_assignee,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return fetch(
    `${process.env.REACT_APP_API_URL}task/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization:  getAuth().token,
      },
      body: formBody,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.CHANGE_STATUS_TASK_INTERN_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.CHANGE_STATUS_TASK_INTERN_FAILED,
      });
    });
}

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
    done: input.done,
    point: input.point,
    due_date: input.due_date,
    users_assignee: input.users_assignee,
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}task/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuth().token,
      },
      body: JSON.stringify(details),
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

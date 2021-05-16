import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function updateTask(input, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_TASK,
  });

  return fetch(`${process.env.REACT_APP_API_URL}task/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuth().token,
    },
    body: JSON.stringify(input),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.UPDATE_TASK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_TASK_FAILED,
      });
    });
}

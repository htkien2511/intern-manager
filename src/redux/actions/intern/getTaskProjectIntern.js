// import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getTaskProjectIntern(project_id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_TASK_PROJECT_INTERN,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}task/project?project_id=${project_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        // Authorization: "Bearer " + getAuth().token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.GET_TASK_PROJECT_INTERN_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_TASK_PROJECT_INTERN_FAILED,
      });
    });
}

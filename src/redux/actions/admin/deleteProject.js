import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function deleteProject(id_project, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_PROJECT,
  });

  return fetch(
    `${process.env.REACT_APP_API_URL}project/delete?id_project=${id_project}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: getAuth().token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.DELETE_PROJECT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_PROJECT_FAILED,
      });
    });
}

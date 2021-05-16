import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function updatePermissionByLeaderID(input, resolve = () => {}) {
  console.log(JSON.stringify(input));
  store.dispatch({
    type: types.UPDATE_PERMISSION_LEADER_ID,
  });
  return fetch(`${process.env.REACT_APP_API_URL}permission/add`, {
    method: "POST",
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
        type: types.UPDATE_PERMISSION_LEADER_ID_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_PERMISSION_LEADER_ID_FAILED,
      });
    });
}

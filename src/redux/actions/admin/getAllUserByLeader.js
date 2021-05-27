import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getAllUserByLeader(resolve = () => {}) {
  store.dispatch({
    type: types.GET_USER_BY_LEADER,
  });
  return fetch(`${process.env.REACT_APP_API_URL}manager/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: getAuth().token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.GET_USER_BY_LEADER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_USER_BY_LEADER_FAILED,
      });
    });
}

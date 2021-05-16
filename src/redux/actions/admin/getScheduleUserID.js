import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getScheduleUserID(user_id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_SCHEDULE_BY_USER_ID,
  });
  return fetch(`${process.env.REACT_APP_API_URL}schedule?user_id=${user_id}`, {
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
        type: types.GET_SCHEDULE_BY_USER_ID_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_SCHEDULE_BY_USER_ID_FAILED,
      });
    });
}

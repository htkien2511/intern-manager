import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function createSchedule(input, resolve = () => {}) {
  store.dispatch({
    type: types.ADD_LEAVE_REQUEST,
  });
  var details = {
    shift: input.shift,
    leave_date: input.leave_date,
    reason_content: input.reason_content,
  };

  return fetch(`${process.env.REACT_APP_API_URL}schedule/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuth().token,
    },
    body: JSON.stringify(details),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ADD_LEAVE_REQUEST_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADD_LEAVE_REQUEST_FAILED,
      });
    });
}

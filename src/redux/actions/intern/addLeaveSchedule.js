import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function addLeaveSchedule(input, resolve = () => {}) {
  store.dispatch({
    type: types.POST_LEAVE_SCHEDULE_INTERN,
  });
  var details = {
    shift: input.shift_date,
    leave_date: input.leave_date,
    reason_content: input.reason_content,
  };
  return fetch(
    `${process.env.REACT_APP_API_URL}schedule/add`,
    {
      method: "POST",
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
        type: types.POST_LEAVE_SCHEDULE_INTERN_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.POST_LEAVE_SCHEDULE_INTERN_FAILED,
      });
    });
}

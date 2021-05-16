import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function updateSchedule(input, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_SCHEDULE_BY_ID,
  });
  var details = {
    shift: input.shift,
    leave_date: input.leave_date,
    reason_content: input.reason_content,
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}schedule/update?leave_id=${input.leave_id}`,
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
        type: types.UPDATE_SCHEDULE_BY_ID_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_SCHEDULE_BY_ID_FAILED,
      });
    });
}

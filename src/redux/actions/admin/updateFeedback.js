import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function updateFeedback(input, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_FEEDBACK,
  });
  return fetch(`${process.env.REACT_APP_API_URL}task/feedback/update`, {
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
        type: types.UPDATE_FEEDBACK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_FEEDBACK_FAILED,
      });
    });
}

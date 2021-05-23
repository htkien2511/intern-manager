import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function addFeedback(input, resolve = () => {}) {
  store.dispatch({
    type: types.ADD_FEEDBACK,
  });

  return fetch(`${process.env.REACT_APP_API_URL}task/feedback/add`, {
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
        type: types.ADD_FEEDBACK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADD_FEEDBACK_FAILED,
      });
    });
}

import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function deleteFeedback(feedback_id, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_FEEDBACK,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}delete?feedback_id=${feedback_id}`,
    {
      method: "PUT",
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
        type: types.DELETE_FEEDBACK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_FEEDBACK_FAILED,
      });
    });
}

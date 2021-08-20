import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function changeAvatar(input, resolve = () => {}) {
  store.dispatch({
    type: types.CHANGE_AVATAR,
  });

  return fetch(
    `${process.env.REACT_APP_API_URL}user/change_avatar?user_id=${input.user_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuth().token,
      },
      body: JSON.stringify(input.url_avatar),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.CHANGE_AVATAR_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.CHANGE_AVATAR_FAILED,
      });
    });
}

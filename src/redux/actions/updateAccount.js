import { getAuth } from "utils/helpers";
import * as types from "../constants";
import store from "../store";
export function updateAccount(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_ACCOUNT,
  });
  var details = {
    id: data.id,
    email: data.email,
    name: data.name,
    address: data.address,
    department: data.department,
    gender: data.gender,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(`${process.env.REACT_APP_API_URL}user_profile/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: getAuth().token,
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.UPDATE_ACCOUNT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_ACCOUNT_FAILED,
      });
    });
}

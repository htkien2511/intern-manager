import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function updateProject(input, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_PROJECT,
  });
  var details = {
    title: input.title,
    description: input.description,
    dueDate: input.dueDate,
    idOfAdmin: input.idOfAdmin,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(
    `${process.env.REACT_APP_API_URL}project/update?id_project=${input.id_project}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: getAuth().token,
      },
      body: formBody,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.UPDATE_PROJECT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_PROJECT_FAILED,
      });
    });
}

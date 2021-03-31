import * as types from "../../constants";
export function setTitle(title) {
  localStorage.setItem("title", title);
  return {
    payload: title,
    type: types.SET_TITLE,
  }
}

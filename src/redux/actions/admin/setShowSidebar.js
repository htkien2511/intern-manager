import * as types from "../../constants";
export function setShowSidebar(status) {
  localStorage.setItem("showSidebar", status);
  return {
    payload: status,
    type: types.SET_SHOW_SIDE_BAR,
  };
}

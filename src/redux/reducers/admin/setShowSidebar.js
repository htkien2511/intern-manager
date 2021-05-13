import * as types from "../../constants";

const initialState = {
  showSidebar: JSON.parse(localStorage.getItem("showSidebar")),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_SHOW_SIDE_BAR:
      return {
        ...state,
        showSidebar: actions.payload,
      };
    default:
      return state;
  }
}

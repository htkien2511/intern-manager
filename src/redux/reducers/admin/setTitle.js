import * as types from "../../constants";

const initialState = {
  title: localStorage.getItem('title'),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_TITLE:
      return {
        ...state,
        title: actions.payload,
      };
    default:
      return state;
  }
}

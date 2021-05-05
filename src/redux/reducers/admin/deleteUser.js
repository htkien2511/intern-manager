import * as types from "../../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.DELETE_USER:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.DELETE_USER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.DELETE_USER_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

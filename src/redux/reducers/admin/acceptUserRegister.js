import * as types from "../../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ACCEPT_USER_REGISTER:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ACCEPT_USER_REGISTER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ACCEPT_USER_REGISTER_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

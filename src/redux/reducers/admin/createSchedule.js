import * as types from "../../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ADD_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ADD_LEAVE_REQUEST_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ADD_LEAVE_REQUEST_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

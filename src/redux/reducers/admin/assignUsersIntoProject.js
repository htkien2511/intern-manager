import * as types from "../../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ASSIGN_USERS_INTO_PROJECT:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ASSIGN_USERS_INTO_PROJECT_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ASSIGN_USERS_INTO_PROJECT_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

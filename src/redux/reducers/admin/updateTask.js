import * as types from "../../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.UPDATE_TASK:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.UPDATE_TASK_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.UPDATE_TASK_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

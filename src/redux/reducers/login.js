import { getAuth, setAuth } from "utils/helpers";
import * as types from "../constants";

const initialState = {
  data: getAuth() || {},
  error: {},
  rememberedPath: localStorage.getItem("rememberedPath") || "",
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.LOGIN_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.LOGIN_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.LOGIN_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.UPDATE_PERMISSIONS_LEADER:
      setAuth({ ...state.data, permissionDomains: actions.payload });
      return {
        ...state,
        data: { ...state.data, permissionDomains: actions.payload },
      };
    case types.REMEMBER_PATH:
      localStorage.setItem("rememberedPath", actions.payload);
      return {
        ...state,
        rememberedPath: actions.payload,
      };
    default:
      return state;
  }
}

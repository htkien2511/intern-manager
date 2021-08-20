import { getAuth } from "utils/helpers";
import * as types from "../../constants";

const initialState = {
  avatar: getAuth()?.avatar?.substring(1, getAuth()?.avatar.length - 1),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_AVATAR:
      return {
        ...state,
        avatar: actions.payload,
      };
    default:
      return state;
  }
}

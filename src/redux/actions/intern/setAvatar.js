import * as types from "../../constants";
export function setAvatar(avatar) {
  return {
    payload: avatar.substring(1, avatar.length - 1),
    type: types.SET_AVATAR,
  };
}

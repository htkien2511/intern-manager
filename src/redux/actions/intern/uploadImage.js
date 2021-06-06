import * as types from "../../constants";
import store from "../../store";
export function uploadImage(files, resolve = () => {}) {
  store.dispatch({
    type: types.UPLOAD_IMAGE,
  });

  const formData = new FormData();
  formData.append("file", files);
  formData.append("upload_preset", "avatar_intern");
  const options = {
    method: "POST",
    body: formData,
  };

  return fetch(
    `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      resolve(res.secure_url);
      store.dispatch({
        payload: res.secure_url,
        type: types.UPLOAD_IMAGE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPLOAD_IMAGE_FAILED,
      });
    });
}

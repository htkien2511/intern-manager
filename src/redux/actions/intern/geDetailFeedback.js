import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function geDetailFeedback(email, resolve = () => { }) {
    store.dispatch({
        type: types.GET_DETAIL_FEEDBACK,
    });
    var details = {
        'email': email,
      };
    
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
    return fetch(`${process.env.REACT_APP_API_URL}manager_profile`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Bearer' + getAuth().token
        },
        body: formBody
    })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
            store.dispatch({
                payload: data,
                type: types.GET_DETAIL_FEEDBACK_SUCCEED,
            });
        })
        .catch((error) => {
            store.dispatch({
                payload: error,
                type: types.GET_DETAIL_FEEDBACK_FAILED,
            });
        });
}

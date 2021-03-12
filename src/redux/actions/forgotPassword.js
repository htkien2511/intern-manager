import * as types from "../constants";
import store from "../store";
export function forgotPassword(data, resolve = () => { }) {
    store.dispatch({
        type: types.FORGOTPASSWORD_API_FAIL,
    });
    var details = {
        'email': data.email,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch("http://192.168.31.65:8080/forgot_password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formBody,
    })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
            store.dispatch({
                payload: data,
                type: types.FORGOTPASSWORD_API_SUCCEED,
            });
        })
        .catch((error) => {
            store.dispatch({
                payload: error,
                type: types.FORGOTPASSWORD_API_FAIL,
            });
        });
}

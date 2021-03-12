import * as types from "../constants";
import store from "../store";
export function resetPassword(data, resolve = () => { }) {
    store.dispatch({
        type: types.RESETPASSWORD_API,
    });
    var details = {
        'password': data.password,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch("http://192.168.31.65:8080/reset_password", {
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
                type: types.RESETPASSWORD_API_SUCCEED,
            });
        })
        .catch((error) => {
            store.dispatch({
                payload: error,
                type: types.RESETPASSWORD_API_FAIL,
            });
        });
}

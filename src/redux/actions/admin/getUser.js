import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getUser(role_name, resolve = () => { }) {
    store.dispatch({
        type: types.GET_USER,
    });
    return fetch(`http://192.168.31.65:8080/user?role_name=${role_name}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            token: getAuth().token
        },
    })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
            store.dispatch({
                payload: data,
                type: types.GET_USER_SUCCEED,
            });
        })
        .catch((error) => {
            store.dispatch({
                payload: error,
                type: types.GET_USER_FAILED,
            });
        });
}

import { getAuth } from "../../../utils/helpers";
import * as types from "../../constants";
import store from "../../store";
export function getAllUser(resolve = () => { }) {
    store.dispatch({
        type: types.GET_USER,
    });
    return fetch(`${process.env.REACT_APP_API_URL}users`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': getAuth().token
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

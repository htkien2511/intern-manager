import * as types from "../../constants";

const initialState = {
    data: {},
    error: {},
    loading: false,
};

export default function reducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_MANAGER:
            return {
                ...state,
                loading: true,
                error: {},
            };
        case types.GET_MANAGER_SUCCEED:
            return {
                ...state,
                data: actions.payload,
                loading: false,
            };
        case types.GET_MANAGER_FAILED:
            return {
                ...state,
                error: actions.payload,
                loading: false,
            };
        default:
            return state;
    }
}

import * as types from "../../constants";

const initialState = {
    data: {},
    error: {},
    loading: false,
};

export default function reducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_PROJECT_INTERN:
            return {
                ...state,
                loading: true,
                error: {},
            };
        case types.GET_PROJECT_INTERN_SUCCEED:
            return {
                ...state,
                data: actions.payload,
                loading: false,
            };
        case types.GET_PROJECT_INTERN_FAILED:
            return {
                ...state,
                error: actions.payload,
                loading: false,
            };
        default:
            return state;
    }
}

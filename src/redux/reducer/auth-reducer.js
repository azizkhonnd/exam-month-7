
import {
    ERROR,
    LOADING,
    LOGIN,
    REGISTER,
} from "../actions/action-types";

const initialState = {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isError: false,
    isSuccess: false,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            localStorage.setItem("token", action.token);
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...state,
                token: action.token,
                user: action.user,
                error: null,
                isError: false,
                isSuccess: true,
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case ERROR:
            return {
                ...state,
                error: "ERROR",
                isError: true,
                isSuccess: false,
                loading: false,
                user: null,
                token: null,
            };
        case "SIGN_OUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                ...state,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
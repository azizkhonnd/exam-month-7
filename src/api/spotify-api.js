import axios from "axios";
import store from "../redux/store/store";
import { SIGN_OUT } from "../redux/actions/action-types";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiInstance.interceptors.request.use(
    (request) => {
        const token = store.getState().token;
        if (token) {
            request.headers["Authorization"] = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            store.dispatch({ type: SIGN_OUT });
        }
        return Promise.reject(error);
    }
);

export default apiInstance;

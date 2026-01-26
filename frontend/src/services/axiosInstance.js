import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // change if needed
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//auto-logout on 401 i.e when token expires
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear Redux + localStorage
            store.dispatch(logoutRedux());

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Hard redirect (safe even outside React)
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

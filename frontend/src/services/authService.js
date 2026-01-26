import axiosInstance from "./axiosInstance";

export const login = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
};

export const register = (data) => {
    return axiosInstance.post("/auth/register", data);
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
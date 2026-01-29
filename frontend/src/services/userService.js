
import axiosInstance from "./axiosInstance";

export const getUserBookings = async () => {
    try {
        const response = await axiosInstance.get("/user/bookings");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/user/me");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (data) => {
    try {
        const response = await axiosInstance.put("/user/update-user", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

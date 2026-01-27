
import axiosInstance from "./axiosInstance";

export const getUserBookings = async () => {
    try {
        const response = await axiosInstance.get("/user/bookings");
        return response.data;
    } catch (error) {
        throw error;
    }
};

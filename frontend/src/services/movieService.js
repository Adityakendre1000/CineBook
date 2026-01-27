
import axiosInstance from "./axiosInstance";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/public/movies");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/public/movies/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

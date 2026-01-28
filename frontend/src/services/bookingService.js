import axiosInstance from './axiosInstance';

const BOOKING_API_URL = '/public';

const bookingService = {
    // Get seat layout for a specific show
    getShowSeats: async (showId) => {
        try {
            const response = await axiosInstance.get(`${BOOKING_API_URL}/shows/${showId}/seats`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch seat layout:", error);
            throw error;
        }
    },

    // Get shows for a specific movie
    getMovieShows: async (movieId) => {
        try {
            const response = await axiosInstance.get(`${BOOKING_API_URL}/movies/${movieId}/shows`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch shows:", error);
            throw error;
        }
    }
};

export default bookingService;

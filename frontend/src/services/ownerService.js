import axiosInstance from './axiosInstance';

const OWNER_API_URL = '/owner';

const ownerService = {
    // Fetch dashboard stats
    getStats: async () => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/stats`);
            return response.data;
        } catch (error) {
            console.error("API Get Stats Failed:", error);
            throw error;
        }
    },

    // Fetch all theatres for the logged-in owner
    getTheatres: async () => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres`);
            return response.data;
        } catch (error) {
            console.error("API Get Theatres Failed:", error);
            throw error;
        }
    },

    // Fetch specific theatre details
    getTheatreById: async (id) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres/${id}`);
            return response.data;
        } catch (error) {
            console.error(`API Get Theatre Failed for ID ${id}:`, error);
            throw error;
        }
    },

    // Add a new theatre
    addTheatre: async (theatreData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/add-theatre`, theatreData);
            return response.data.data; // Assuming ApiResponse structure
        } catch (error) {
            console.error("API Add Theatre Failed:", error);
            throw error;
        }
    },

    // Add a new screen
    addScreen: async (theatreId, screenData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/add-screen`, { theatreId, ...screenData });
            return response.data;
        } catch (error) {
            console.error("API Add Screen Failed:", error);
            throw error;
        }
    },

    // Delete a screen
    deleteScreen: async (screenId) => {
        // Implement soft delete endpoint if available or just log for now
        console.warn("Soft Delete API not yet implemented in backend");
        return true; 
    },

    // Schedule a show
    addShow: async (showData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/add-show`, showData);
            return response.data.data;
        } catch (error) {
            console.error("API Add Show Failed:", error);
            throw error;
        }
    },

    // Get shows for a theatre
    getShows: async (theatreId) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres/${theatreId}/shows`);
            return response.data;
        } catch (error) {
            console.error("API Get Shows Failed:", error);
            throw error;
        }
    },

    // Get Theatre Stats
    getTheatreStats: async (theatreId) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres/${theatreId}/stats`);
            return response.data;
        } catch (error) {
            console.error("API Get Theatre Stats Failed:", error);
            throw error;
        }
    },

    // Get Theatre Bookings
    getTheatreBookings: async (theatreId) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres/${theatreId}/bookings`);
            return response.data;
        } catch (error) {
            console.error("API Get Theatre Bookings Failed:", error);
            throw error;
        }
    }
};

export default ownerService;

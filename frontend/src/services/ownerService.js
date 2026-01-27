import axiosInstance from './axiosInstance';
import { MOCK_THEATERS, MOCK_SHOWS, MOCK_STATS } from '../data/mockData';

const OWNER_API_URL = '/owner';

const ownerService = {
    // Fetch dashboard stats
    getStats: async () => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/stats`);
            return response.data;
        } catch (error) {
            console.warn("API Get Stats Failed, falling back to Mock Data:", error);
            return MOCK_STATS;
        }
    },

    // Fetch all theatres for the logged-in owner
    getTheatres: async () => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres`);
            return response.data;
        } catch (error) {
            console.warn("API Fetch Failed, falling back to Mock Data:", error);
            return MOCK_THEATERS; // Fallback to mock data
        }
    },

    // Fetch specific theatre details
    getTheatreById: async (id) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/theatres/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`API Fetch Failed for ID ${id}, falling back to Mock Data:`, error);
            // Find mocked theatre or return a default structure
            const mockTheatre = MOCK_THEATERS.find(t => t.id === parseInt(id));
            if (mockTheatre) {
                return {
                    ...mockTheatre,
                    description: "Premium cinema experience with 4K projection and Dolby Atmos. (Mock Description)",
                };
            }

            // Fallback for newly created (client-side only) theatres
            return {
                id: parseInt(id),
                name: "New Demo Theatre",
                location: "Mock Location",
                city: "Mumbai",
                screens: [],
                status: "OPEN",
                rating: 0,
                description: "This is a newly created theatre (mock data persistence only).",
                image: "https://images.unsplash.com/photo-1517604931442-71053e3e2c3c?auto=format&fit=crop&q=80&w=800"
            };
        }
    },

    // Add a new theatre
    addTheatre: async (theatreData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/theatres`, theatreData);
            return response.data;
        } catch (error) {
            console.warn("API Add Theatre Failed, simulating success:", error);
            // Simulate success return
            return {
                id: Math.floor(Math.random() * 1000),
                ...theatreData,
                status: 'PENDING',
                rating: 0,
                screens: 0,
                image: "https://images.unsplash.com/photo-1517604931442-71053e3e2c3c?auto=format&fit=crop&q=80&w=800"
            };
        }
    },

    // Add a new screen
    addScreen: async (theatreId, screenData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/theatres/${theatreId}/screens`, screenData);
            return response.data;
        } catch (error) {
            console.warn("API Add Screen Failed, simulating success:", error);
            return { id: Math.floor(Math.random() * 1000), ...screenData };
        }
    },

    // Delete a screen
    deleteScreen: async (screenId) => {
        try {
            await axiosInstance.delete(`${OWNER_API_URL}/screens/${screenId}`);
            return true;
        } catch (error) {
            console.warn("API Delete Screen Failed, simulating success:", error);
            return true;
        }
    },

    // Schedule a show
    addShow: async (showData) => {
        try {
            const response = await axiosInstance.post(`${OWNER_API_URL}/shows`, showData);
            return response.data;
        } catch (error) {
            console.warn("API Add Show Failed, simulating success:", error);
            return { id: Math.floor(Math.random() * 1000), ...showData, occupancy: "0/100" };
        }
    },

    // Get shows for a theatre
    getShows: async (theatreId) => {
        try {
            const response = await axiosInstance.get(`${OWNER_API_URL}/shows/${theatreId}`);
            return response.data;
        } catch (error) {
            console.warn("API Get Shows Failed, falling back to Mock:", error);
            return MOCK_SHOWS;
        }
    }
};

export default ownerService;

import axiosInstance from "./axiosInstance";

// Stats
export const getDashboardStats = () => {
    return axiosInstance.get("/admin/stats");
};

// Users
export const getAllUsers = () => {
    return axiosInstance.get("/admin/users");
};

export const updateUserStatus = (userId) => {
    return axiosInstance.patch(`/admin/users/${userId}/status`);
};

// Movies
export const getAllMovies = () => {
    return axiosInstance.get("/admin/movies");
};

export const addMovie = (movieData) => {
    return axiosInstance.post("/admin/movies", movieData);
};

export const updateMovie = (id, movieData) => {
    return axiosInstance.put(`/admin/movies/${id}`, movieData);
};

export const updateMovieStatus = (id) => {
    return axiosInstance.patch(`/admin/movies/${id}/status`);
};

// Approvals
export const getAllTheatres = () => {
    return axiosInstance.get("/admin/theatres");
};

export const getPendingTheatres = () => {
    return axiosInstance.get("/admin/approvals");
};

export const approveTheatre = (id, approved) => {
    return axiosInstance.patch(`/admin/approvals/${id}?approved=${approved}`);
};

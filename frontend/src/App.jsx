import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import UserView from "./pages/UserView";
import MovieDetailPage from "./pages/MovieDetailPage";
import TermsAndServices from "./pages/TermsAndServices";
import TheaterSelectionPage from "./pages/TheaterSelectionPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import TheatreList from "./pages/TheatreList";
import TheatreDetail from "./pages/TheatreDetail";
import MyBookings from "./pages/MyBookings";
import MovieSeats from "./components/movie/MovieSeats";
import SeatSelectionPage from "./pages/SeatSelectionPage";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import MoviesList from "./pages/admin/MoviesList";
import PendingApprovals from "./pages/admin/PendingApprovals";
import TheatreOwners from "./pages/admin/TheatreOwners";

import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <ToastProvider>
          <Routes>
            {/* DEFAULT */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-and-services" element={<TermsAndServices />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path='/movie/seats/:theaterId/:movieId' element={<SeatSelectionPage />} />

            {/* USER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
              <Route path="/userview" element={<UserView />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/book/:id" element={<TheaterSelectionPage />} />

            </Route>

            {/* THEATER OWNER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={["ROLE_OWNER"]} />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/theatres" element={<TheatreList />} />
              <Route path="/owner/theatres/:id" element={<TheatreDetail />} />
              {/* Redirect old route /theaterowner to new dashboard */}
              <Route path="/theaterowner" element={<Navigate to="/owner/dashboard" replace />} />
            </Route>



            {/* SUPER ADMIN ROUTES */}
            <Route path="/superadmin" element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersList />} />
              <Route path="movies" element={<MoviesList />} />
              <Route path="approvals" element={<PendingApprovals />} />
              <Route path="owners" element={<TheatreOwners />} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ToastProvider>
      </div>
    </div>
  );
};

export default App;

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
import TheaterOwnerView from "./pages/TheatereOwnerView";
import MyBookings from "./pages/MyBookings";

// Admin Pages

import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingApprovals from "./pages/admin/PendingApprovals";
import TheatreOwners from "./pages/admin/TheatreOwners";
import UsersList from "./pages/admin/UsersList";
import MoviesList from "./pages/admin/MoviesList";

import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* SUPER ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/superadmin" element={<AdminDashboard />} />
            <Route path="/superadmin/users" element={<UsersList />} />
            <Route path="/superadmin/movies" element={<MoviesList />} />
            <Route path="/superadmin/approvals" element={<PendingApprovals />} />
            <Route path="/superadmin/owners" element={<TheatreOwners />} />
          </Route>
        </Route>

        {/* MAIN APP ROUTES */}
        <Route element={<MainLayout />}>
            {/* DEFAULT */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-and-services" element={<TermsAndServices />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />

            {/* USER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
              <Route path="/userview" element={<UserView />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/book/:id" element={<TheaterSelectionPage />} />
            </Route>

            {/* THEATER OWNER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={["ROLE_OWNER"]} />}>
              <Route path="/theaterowner" element={<TheaterOwnerView />} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;

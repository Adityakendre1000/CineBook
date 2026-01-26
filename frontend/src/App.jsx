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
import SuperAdminView from "./pages/SuperAdminView";
import MyBookings from "./pages/MyBookings";

import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 bg-[#1a1a1a] text-white">
      <Navbar />
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

          {/* SUPER ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/superadmin" element={<SuperAdminView />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ToastProvider>
    </div>
  );
};

export default App;

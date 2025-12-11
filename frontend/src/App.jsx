import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import { ToastProvider } from './context/ToastContext';
import ErrorPage from './pages/ErrorPage';
import UserView from './pages/UserView';
import MovieDetailPage from './pages/MovieDetailPage';
import TermsAndServices from './pages/TermsAndServices';
import TheaterSelectionPage from './pages/TheaterSelectionPage';
import TheaterOwnerView from './pages/TheatereOwnerView';
import SuperAdminView from './pages/SuperAdminView';
import MyBookings from './pages/MyBookings';

const App = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 bg-[#1a1a1a] text-white">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/theaterowner" element={<TheaterOwnerView />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/userview" element={<UserView />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/terms-and-services" element={<TermsAndServices />} />
          <Route path="/superadmin" element={<SuperAdminView />} />
          <Route path="/book/:id" element={<TheaterSelectionPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ToastProvider>
    </div>
  );
};

export default App;

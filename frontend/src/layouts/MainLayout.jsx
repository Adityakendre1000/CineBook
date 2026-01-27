import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

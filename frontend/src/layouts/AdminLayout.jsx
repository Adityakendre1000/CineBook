import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      <AdminNavbar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

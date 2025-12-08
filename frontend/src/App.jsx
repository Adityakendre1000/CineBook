import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CustomerView from './pages/customerView';
const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    
    <Route path="/customer" element={<CustomerView />} />
  </Routes>
);

export default App;
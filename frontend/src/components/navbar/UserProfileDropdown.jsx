import React, { useState, useRef } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutRedux } from '../../store/authSlice';
import { logout as logoutService } from '../../services/authService';

const UserProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        logoutService();
        dispatch(logoutRedux());
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    // Extract first name from user.name or use email username
    const getFirstName = () => {
        if (user?.name) {
            return user.name.split(' ')[0]; // Get first word from name
        }
        if (user?.firstName) {
            return user.firstName;
        }
        if (user?.email) {
            return user.email.split('@')[0]; // Get part before @ from email
        }
        return 'User';
    };

    const handleMouseEnter = () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        // Set timeout to close after 3 seconds
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                </div>
                <span className="text-white font-medium hidden sm:block">
                    {getFirstName()}
                </span>
                <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-semibold text-sm truncate">
                            {user?.firstName && user?.lastName 
                                ? `${user.firstName} ${user.lastName}` 
                                : user?.name || 'User'}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                            {user?.email || 'user@example.com'}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            onClick={handleProfileClick}
                            className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                        >
                            <User size={18} className="text-gray-400" />
                            <span className="text-white text-sm">My Profile</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left"
                        >
                            <LogOut size={18} className="text-red-500" />
                            <span className="text-red-500 text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;

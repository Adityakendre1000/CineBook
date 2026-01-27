import React from "react";
import { LogOut, LayoutDashboard, ClipboardList, Users, Film } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { logout as logoutRedux } from "../../store/authSlice";
import { logout as logoutService } from "../../services/authService";
import CineBookBrand from "../navbar/CineBookBrand";

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logoutService();
        dispatch(logoutRedux());
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/superadmin", label: "Dashboard", icon: LayoutDashboard },
        { path: "/superadmin/users", label: "Users", icon: Users },
        { path: "/superadmin/movies", label: "Movies", icon: Film },
        { path: "/superadmin/approvals", label: "Approvals", icon: ClipboardList },
        { path: "/superadmin/owners", label: "Theater Owners", icon: Users },
    ];

    return (
        <nav className="h-screen w-64 bg-[#111] border-r border-white/10 fixed left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-white/10">
                 <CineBookBrand to="/superadmin" />
            </div>

            <div className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                            ${isActive(item.path) 
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <item.icon size={20} className={isActive(item.path) ? "text-white" : "text-gray-400 group-hover:text-white"} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;

import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutRedux } from "../../store/authSlice";
import { logout as logoutService } from "../../services/authService";
import CineBookBrand from "./CineBookBrand";

const UserNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutService();
        dispatch(logoutRedux());
        navigate("/login");
    };

    return (
        <nav className="p-6 flex justify-between items-center">
            {/* CineBook logo + name */}
            <CineBookBrand to="/userview" />

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/userview")}
                    className="cursor-pointer hover:text-gray-300"
                >
                    Home
                </button>

                <button
                    onClick={() => navigate("/my-bookings")}
                    className="cursor-pointer hover:text-gray-300"
                >
                    My Bookings
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default UserNavbar;

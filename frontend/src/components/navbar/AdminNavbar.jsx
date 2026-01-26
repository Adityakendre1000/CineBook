import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutRedux } from "../../store/authSlice";
import { logout as logoutService } from "../../services/authService";
import CineBookBrand from "./CineBookBrand";

const AdminNavbar = () => {
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
            <CineBookBrand to="/superadmin" />

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/superadmin")}
                    className="cursor-pointer hover:text-gray-300"
                >
                    Dashboard
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

export default AdminNavbar;

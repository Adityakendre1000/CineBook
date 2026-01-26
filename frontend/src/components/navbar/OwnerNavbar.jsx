import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutRedux } from "../../store/authSlice";
import { logout as logoutService } from "../../services/authService";

const OwnerNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutService();
        dispatch(logoutRedux());
        navigate("/login");
    };

    return (
        <nav className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">CineBook (Owner)</h2>

            <div className="flex items-center gap-6">
                <button onClick={() => navigate("/theaterowner")}>Dashboard</button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default OwnerNavbar;

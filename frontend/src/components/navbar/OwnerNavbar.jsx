import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutRedux } from "../../store/authSlice";
import { logout as logoutService } from "../../services/authService";
import CineBookBrand from "./CineBookBrand";

const OwnerNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutService();
        dispatch(logoutRedux());
        navigate("/login");
    };


    return (
        <nav className="p-6 flex justify-between items-center border-b border-white/10 mb-6 bg-[#1a1a1a]">
            {/* CineBook logo + name */}
            <CineBookBrand to="/owner/dashboard" />

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 mr-4 bg-[#1e1e1e] px-6 py-2 rounded-full border border-white/5">
                    <button
                        onClick={() => navigate("/owner/dashboard")}
                        className="font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/owner/theatres")}
                        className="font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        My Theatres
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-400 font-bold bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default OwnerNavbar;

import { useNavigate } from "react-router-dom";
import CineBookBrand from "./CineBookBrand";
import UserProfileDropdown from "./UserProfileDropdown";

const OwnerNavbar = () => {
    const navigate = useNavigate();

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

                {/* User Profile Dropdown */}
                <UserProfileDropdown />
            </div>
        </nav>
    );
};

export default OwnerNavbar;

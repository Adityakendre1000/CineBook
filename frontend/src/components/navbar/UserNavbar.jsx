import { useNavigate } from "react-router-dom";
import CineBookBrand from "./CineBookBrand";
import UserProfileDropdown from "./UserProfileDropdown";

const UserNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="p-6 flex justify-between items-center">
            {/* CineBook logo + name */}
            <CineBookBrand to="/userview" />

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/userview")}
                    className="cursor-pointer hover:text-gray-300 font-medium"
                >
                    Home
                </button>

                <button
                    onClick={() => navigate("/my-bookings")}
                    className="cursor-pointer hover:text-gray-300 font-medium"
                >
                    My Bookings
                </button>

                {/* User Profile Dropdown */}
                <UserProfileDropdown />
            </div>
        </nav>
    );
};

export default UserNavbar;

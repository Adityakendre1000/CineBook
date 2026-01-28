import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import PublicNavbar from "./PublicNavbar";
import UserNavbar from "./UserNavbar";
import OwnerNavbar from "./OwnerNavbar";


const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();

    // Hide global navbar on admin routes since AdminLayout has its own sidebar
    if (location.pathname.startsWith("/superadmin")) {
        return null;
    }

    if (!isAuthenticated || !user) return <PublicNavbar />;

    switch (user.role) {
        case "ROLE_USER":
            return <UserNavbar />;
        case "ROLE_OWNER":
            return <OwnerNavbar />;
        case "ROLE_ADMIN":
            // Admins usually use the AdminLayout, but if they land here (public pages),
            // we can show the UserNavbar or a specific link.
            return <UserNavbar />; 
        default:
            return <PublicNavbar />;
    }
};

export default Navbar;
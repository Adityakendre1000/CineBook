import { useSelector } from "react-redux";

import PublicNavbar from "./PublicNavbar";
import UserNavbar from "./UserNavbar";
import OwnerNavbar from "./OwnerNavbar";


const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated || !user) return <PublicNavbar />;

    switch (user.role) {
        case "ROLE_USER":
            return <UserNavbar />;
        case "ROLE_OWNER":
            return <OwnerNavbar />;
        case "ROLE_ADMIN":
            // Admins usually use the AdminLayout, but if they land here (public pages),
            // we can show the UserNavbar or a specific link.
            // For now, let's show UserNavBar so they can still browse movies, 
            // but we might want to add a "Go to Dashboard" button later.
            return <UserNavbar />; // Or create a specific minimal nav for admins on public pages.
        default:
            return <PublicNavbar />;
    }
};

export default Navbar;
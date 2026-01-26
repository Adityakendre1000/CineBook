import { useSelector } from "react-redux";

import PublicNavbar from "./PublicNavbar";
import UserNavbar from "./UserNavbar";
import OwnerNavbar from "./OwnerNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) return <PublicNavbar />;

    switch (user.role) {
        case "ROLE_USER":
            return <UserNavbar />;
        case "ROLE_OWNER":
            return <OwnerNavbar />;
        case "ROLE_ADMIN":
            return <AdminNavbar />;
        default:
            return <PublicNavbar />;
    }
};

export default Navbar;

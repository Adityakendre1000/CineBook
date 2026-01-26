import CineBookBrand from "./CineBookBrand";

const PublicNavbar = () => (
  <nav className="relative z-50 p-6 bg-[#1a1a1a]">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <CineBookBrand to="/login" />
    </div>
  </nav>
);

export default PublicNavbar;

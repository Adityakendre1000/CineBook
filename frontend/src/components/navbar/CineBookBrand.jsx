import { Film } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CineBookBrand = ({ to = "/" }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(to)}
            className="flex items-center gap-3 cursor-pointer"
        >
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-xl shadow-lg shadow-red-900/40">
                <Film className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
                CineBook<span className="text-red-500">.</span>
            </span>
        </div>
    );
};

export default CineBookBrand;

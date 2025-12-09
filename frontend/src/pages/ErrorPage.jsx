import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-6">
            <div className="flex items-center justify-center bg-red-600/10 p-6 rounded-full mb-6">
                <AlertTriangle className="text-red-500" size={48} />
            </div>

            <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
            <p className="text-xl text-gray-300 mb-4">Page Not Found</p>
            <p className="text-gray-400 max-w-md mb-8">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition cursor-pointer"
            >
                Go Back to Login
            </button>
        </div>
    );
};

export default ErrorPage;

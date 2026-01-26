import React, { useState } from "react";
import { Film, User, Lock, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PublicNavbar from "../components/PublicNavbar";
import { login } from "../services/authService";
import { loginSuccess } from "../store/authSlice";
import { useToast } from "../context/ToastContext";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await login({ email, password });

            // backend contract
            const { token, user } = res.data.data;

            dispatch(loginSuccess({ token, user }));
            addToast("Login successful", "success");

            // role-based redirect
            if (user.role === "ROLE_USER") {
                navigate("/userview");
            } else if (user.role === "ROLE_OWNER") {
                navigate("/theaterowner");
            } else if (user.role === "ROLE_ADMIN") {
                navigate("/superadmin");
            } else {
                navigate("/");
            }
        } catch (err) {
            const message =
                err.response?.data?.message || "Invalid email or password";

            setError(message);
            addToast(message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <PublicNavbar />

            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 pt-24 relative overflow-hidden">
                <div className="w-full max-w-md bg-[#1e1e1e] border border-white/10 p-8 rounded-3xl relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg shadow-red-900/40 mb-4">
                            <Film className="text-white h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            CineBook<span className="text-red-500">.</span>
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Sign in to access your dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                                    Email
                                </label>
                                <div className="relative">
                                    <User
                                        className="absolute left-4 top-3.5 text-gray-500"
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-3.5 text-gray-500"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg text-sm border border-red-500/20">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-gray-400">
                            Don&apos;t have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-red-400 hover:text-red-300 font-bold hover:underline transition-all"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

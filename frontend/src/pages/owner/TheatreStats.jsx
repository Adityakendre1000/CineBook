import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, Film, Activity, TrendingUp, Calendar } from 'lucide-react';
import ownerService from '../../services/ownerService';

const TheatreStats = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        revenue: 0,
        visitors: 0,
        activeShows: 0,
        occupancy: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const data = await ownerService.getTheatreStats(id);
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch theatre stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [id]);

    return (
        <div className="p-6 space-y-8 animate-fade-in text-white min-h-screen">
             {/* Header */}
             <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/owner/theatres')}
                    className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-extrabold">Theatre Statistics</h1>
                    <p className="text-gray-400">Performance metrics for Theatre ID: #{id}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">₹{stats.revenue?.toLocaleString() || 0}</h3>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                </div>

                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <Users size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats.visitors?.toLocaleString() || 0}</h3>
                    <p className="text-gray-400 text-sm">Total Visitors</p>
                </div>

                 <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                            <Activity size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats.occupancy}%</h3>
                    <p className="text-gray-400 text-sm">Avg Occupancy (Est.)</p>
                </div>

                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                            <Film size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats.activeShows}</h3>
                    <p className="text-gray-400 text-sm">Active Shows Today</p>
                </div>
            </div>

            {/* Placeholder for Charts */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="bg-white/5 p-4 rounded-full mb-4">
                    <TrendingUp size={48} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Detailed Analytics</h3>
                <p className="text-gray-500 max-w-md">Historical revenue and visitor charts will be available here soon.</p>
            </div>
        </div>
    );
};

export default TheatreStats;

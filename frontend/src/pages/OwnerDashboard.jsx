import React, { useState, useEffect } from 'react';
import { DollarSign, Ticket, Monitor, TrendingUp, RefreshCw } from 'lucide-react';
import ownerService from '../services/ownerService';

const OwnerDashboard = () => {
    const [stats, setStats] = useState({
        revenue: '0',
        ticketsSold: '0',
        activeScreens: '0'
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchStats = async () => {
        setIsLoading(true);
        const data = await ownerService.getStats();
        setStats(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Owner Dashboard</h1>
                    <p className="text-gray-400 mt-1">Overview of your cinema empire performance.</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 hidden md:block">Last updated: Just now</span>
                    <button
                        onClick={fetchStats}
                        disabled={isLoading}
                        className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh Stats"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: 'Total Revenue',
                        value: `₹${stats?.revenue || '0'}`,
                        icon: DollarSign,
                        color: 'text-green-400',
                        bg: 'bg-green-500/10',
                        trend: '+12.5% vs last month'
                    },
                    {
                        label: 'Tickets Sold',
                        value: stats?.ticketsSold || '0',
                        icon: Ticket,
                        color: 'text-red-400',
                        bg: 'bg-red-500/10',
                        trend: '+5.2% vs last month'
                    },
                    {
                        label: 'Active Screens',
                        value: `${stats?.activeScreens || 0} / 15`,
                        icon: Monitor,
                        color: 'text-blue-400',
                        bg: 'bg-blue-500/10',
                        trend: '2 Screens under maintenance'
                    }
                ].map((stat, index) => (
                    <div key={index} className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                                <TrendingUp size={12} /> {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                            {isLoading ? (
                                <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
                            ) : stat.value}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Graph Area Placeholder */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="bg-white/5 p-4 rounded-full mb-4">
                    <TrendingUp size={48} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Revenue Analytics</h3>
                <p className="text-gray-500 max-w-md">Detailed charts and date-range filtering will be available here in the next update.</p>
            </div>

        </div>
    );
};

export default OwnerDashboard;

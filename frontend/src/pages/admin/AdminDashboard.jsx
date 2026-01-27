import React from 'react';
import { Users, Building2, Ticket, TrendingUp } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { MOCK_THEATERS, MOCK_REQUESTS, MOCK_REVENUE_DATA, MOCK_GENRE_DATA } from '../../data/mockData';

const AdminDashboard = () => {
    // Stats for cards
    const stats = [
        { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Active Theaters", value: MOCK_THEATERS.length, icon: Building2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
        { label: "Total Bookings", value: "85,200", icon: Ticket, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
        { label: "Pending Requests", value: MOCK_REQUESTS.filter(r => r.status === 'Pending').length, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ];

    const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-400 mt-2">Overview of system performance and statistics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.border} border`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Trend Chart */}
                <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-6 shadow-xl">
                    <h3 className="font-bold text-lg mb-6">Revenue Trend</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1f1f1f', border: '1px solid #333', borderRadius: '8px'}}
                                    itemStyle={{color: '#fff'}}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#ef4444" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Genre Distribution Chart */}
                <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-6 shadow-xl">
                    <h3 className="font-bold text-lg mb-6">Occupancy by Genre</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={MOCK_GENRE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {MOCK_GENRE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1f1f1f', border: '1px solid #333', borderRadius: '8px'}}
                                    itemStyle={{color: '#fff'}}
                                />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{paddingTop: '20px'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

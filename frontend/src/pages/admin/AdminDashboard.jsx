import React from 'react';
import { Users, Building2, Ticket, TrendingUp, MapPin, Calendar, Star, Layout } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { MOCK_THEATERS, MOCK_REQUESTS, MOCK_REVENUE_DATA, MOCK_GENRE_DATA, MOCK_MOVIES } from '../../data/mockData';

const AdminDashboard = () => {
    // Stats for cards
    const stats = [
        { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Active Theaters", value: MOCK_THEATERS.length, icon: Building2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
        { label: "Total Bookings", value: "85,200", icon: Ticket, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
        { label: "Pending Requests", value: MOCK_REQUESTS.filter(r => r.status === 'Pending').length, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ];

    const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
    const pendingRequests = MOCK_REQUESTS.slice(0, 3); // Show top 3 recent
    const topMovies = [...MOCK_MOVIES].sort((a,b) => b.rating - a.rating).slice(0, 3);

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

            {/* Recent Activity & Top Movies Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Recent Registrations */}
                 <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Recent Registration Requests</h3>
                    </div>
                    <div className="space-y-4">
                        {pendingRequests.map((req) => (
                            <div key={req.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        req.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' : 
                                        req.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{req.name}</h4>
                                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><MapPin size={12}/> {req.location}</span>
                                            <span className="flex items-center gap-1"><Calendar size={12}/> {req.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
                                     req.status === 'Pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                                     req.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                }`}>
                                    {req.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performing Movies */}
                <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-6 shadow-xl">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Top Performing Movies</h3>
                    </div>
                    <div className="space-y-4">
                         {topMovies.map((movie, index) => (
                             <div key={movie.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                                 <div className="font-bold text-gray-500 w-6 text-center">{index + 1}</div>
                                 <img src={movie.image} alt={movie.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                                 <div className="flex-1">
                                     <h4 className="font-medium text-white">{movie.title}</h4>
                                     <p className="text-xs text-gray-400 mt-0.5">{movie.genre}</p>
                                 </div>
                                 <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded text-sm">
                                     <Star size={14} fill="currentColor" /> {movie.rating}
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

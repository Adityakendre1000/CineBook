import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const TheatreStats = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    // Mock Data
    const revenueData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];

    const occupancyData = [
        { name: 'Screen 1', value: 400 },
        { name: 'Screen 2', value: 300 },
        { name: 'Screen 3', value: 300 },
        { name: 'Screen 4', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in text-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/owner/theatres')}
                        className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold">Theatre Statistics</h1>
                        <p className="text-gray-400">Detailed analytics for Theatre ID: #{id}</p>
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <DollarSign className="text-green-400" size={24} />
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">₹45,200</h3>
                    <p className="text-gray-400 text-sm">Total Revenue (Weekly)</p>
                </div>
                
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Users className="text-blue-400" size={24} />
                        </div>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">1,240</h3>
                    <p className="text-gray-400 text-sm">Total Visitors</p>
                </div>

                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <TrendingUp className="text-purple-400" size={24} />
                        </div>
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">68%</h3>
                    <p className="text-gray-400 text-sm">Avg Occupancy</p>
                </div>

                 <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl">
                            <Calendar className="text-orange-400" size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">24</h3>
                    <p className="text-gray-400 text-sm">Active Shows Today</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Weekly Revenue Trend</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Occupancy Chart */}
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Screen Occupancy Distribution</h3>
                    <div className="h-[300px] flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={occupancyData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {occupancyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 flex-wrap">
                        {occupancyData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm text-gray-400">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheatreStats;

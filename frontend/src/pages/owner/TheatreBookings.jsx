import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, CheckCircle, Clock } from 'lucide-react';

const TheatreBookings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Booking Data
    // In a real app, this would come from an API endpoint: GET /owner/bookings?theatreId=xyz
    const bookings = [
        { id: 'BK-7829', movie: 'Inception', showTime: '10:00 AM', date: '2024-02-15', seats: 'A1, A2', amount: 450, status: 'CONFIRMED', customer: 'John Doe' },
        { id: 'BK-7830', movie: 'The Dark Knight', showTime: '02:00 PM', date: '2024-02-15', seats: 'C5, C6, C7', amount: 900, status: 'CONFIRMED', customer: 'Jane Smith' },
        { id: 'BK-7831', movie: 'Interstellar', showTime: '06:00 PM', date: '2024-02-15', seats: 'D10', amount: 250, status: 'PENDING', customer: 'Alice Brown' },
        { id: 'BK-7832', movie: 'Inception', showTime: '10:00 AM', date: '2024-02-16', seats: 'B4, B5', amount: 500, status: 'CANCELLED', customer: 'Bob Wilson' },
        { id: 'BK-7833', movie: 'Avatar 2', showTime: '09:00 PM', date: '2024-02-16', seats: 'F1, F2', amount: 600, status: 'CONFIRMED', customer: 'Charlie Davis' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-500 bg-green-500/10';
            case 'PENDING': return 'text-yellow-500 bg-yellow-500/10';
            case 'CANCELLED': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
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
                        <h1 className="text-3xl font-extrabold">Booking History</h1>
                        <p className="text-gray-400">All bookings for Theatre ID: #{id}</p>
                    </div>
                </div>
                <button
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold"
                >
                    <Download size={18} /> Export CSV
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by Booking ID, Movie or Customer..." 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none">
                        <option>All Status</option>
                        <option>Confirmed</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                    </select>
                    <button className="bg-white/5 hover:bg-white/10 p-2.5 rounded-lg border border-white/10">
                        <Filter size={20} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0a0a0a] text-gray-400 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Booking ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Movie</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Seats</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-purple-400">{booking.id}</td>
                                    <td className="px-6 py-4 font-bold">{booking.customer}</td>
                                    <td className="px-6 py-4">{booking.movie}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">
                                        <div className="flex flex-col">
                                            <span>{booking.date}</span>
                                            <span className="text-xs">{booking.showTime}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{booking.seats}</td>
                                    <td className="px-6 py-4 font-bold">₹{booking.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                                            {booking.status === 'CONFIRMED' && <CheckCircle size={12} />}
                                            {booking.status === 'PENDING' && <Clock size={12} />}
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TheatreBookings;

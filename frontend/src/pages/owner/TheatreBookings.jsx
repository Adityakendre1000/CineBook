import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, CheckCircle, Clock } from 'lucide-react';

import ownerService from '../../services/ownerService';

const TheatreBookings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            try {
                const data = await ownerService.getTheatreBookings(id);
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-500 bg-green-500/10';
            case 'PENDING': return 'text-yellow-500 bg-yellow-500/10';
            case 'CANCELLED': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
    };

    const filteredBookings = bookings.filter(booking => 
        booking.bookingId.toString().includes(searchTerm) ||
        booking.movieName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {/* Export CSV placeholder - Disabled for now or implemented later */}
                {bookings.length > 0 && (
                    <button
                        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                )}
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">Loading bookings...</td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">No bookings found.</td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.bookingId} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-purple-400">#{booking.bookingId}</td>
                                        <td className="px-6 py-4 font-bold">{booking.customerName}</td>
                                        <td className="px-6 py-4">{booking.movieName}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            <div className="flex flex-col">
                                                <span>{booking.showDate}</span>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TheatreBookings;

import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { getAllTheatres } from '../../services/adminService';

const TheatreOwners = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [owners, setOwners] = useState([]);

    const fetchOwners = async () => {
        try {
            const response = await getAllTheatres();
            setOwners(response.data.data);
        } catch (error) {
            console.error("Failed to fetch theatre owners", error);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const filteredOwners = owners.filter(t => 
        (t.owner && (t.owner.firstName + " " + t.owner.lastName).toLowerCase().includes(searchTerm.toLowerCase())) || 
        (t.theatreName && t.theatreName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.location && t.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Theater Owners</h1>
                    <p className="text-gray-400 mt-2">Manage active theater owners and their details.</p>
                </div>
                {/* Search Bar */}
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search owners or theaters..." 
                        className="bg-[#1e1e1e] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 w-64 text-sm focus:outline-none focus:border-red-600 transition-colors text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 text-gray-400 text-xs uppercase font-bold border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4">Owner / Theater</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredOwners.map((theatre) => (
                            <tr key={theatre.theatreId} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                            <Building2 size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{theatre.theatreName}</h4>
                                            <p className="text-gray-400 text-xs">{theatre.owner ? `${theatre.owner.firstName} ${theatre.owner.lastName}` : 'N/A'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Mail size={12} /> {theatre.owner ? theatre.owner.email : 'N/A'}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Phone size={12} /> {theatre.owner ? theatre.owner.mobileNo : 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-500" />
                                        {theatre.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        theatre.theatreStatus === 'ACTIVE' 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                        {theatre.theatreStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOwners.length === 0 && (
                     <div className="p-8 text-center text-gray-500 text-sm">
                        No owners found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheatreOwners;

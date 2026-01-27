import React, { useState } from 'react';
import { Search, MoreVertical, Building2, MapPin, Mail, Phone } from 'lucide-react';

const TheatreOwners = () => {
    // Mock data for theater owners (can be moved to mockData.js later)
    const MOCK_OWNERS = [
        { id: 1, name: "John Doe", theater: "Cinema Royal", email: "john@cineraroyal.com", phone: "+1 234 567 8900", location: "Brooklyn, NY", status: "Active" },
        { id: 2, name: "Sarah Smith", theater: "Grand Theater", email: "sarah@grandtheater.com", phone: "+1 987 654 3210", location: "Los Angeles, CA", status: "Active" },
        { id: 3, name: "Mike Johnson", theater: "Starlight Plex", email: "mike@starlight.com", phone: "+1 456 789 0123", location: "Austin, TX", status: "Active" },
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const filteredOwners = MOCK_OWNERS.filter(owner => 
        owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        owner.theater.toLowerCase().includes(searchTerm.toLowerCase())
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
                        placeholder="Search owners..." 
                        className="bg-[#1e1e1e] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 w-64 text-sm focus:outline-none focus:border-red-600 transition-colors"
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
                        {filteredOwners.map((owner) => (
                            <tr key={owner.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                            <Building2 size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{owner.theater}</h4>
                                            <p className="text-gray-400 text-xs">{owner.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Mail size={12} /> {owner.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Phone size={12} /> {owner.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-500" />
                                        {owner.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                        {owner.status}
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

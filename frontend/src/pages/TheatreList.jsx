import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Film, Monitor, X, Loader } from 'lucide-react';
import ownerService from '../services/ownerService';
import { useToast } from '../context/ToastContext';

const TheatreList = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [theatres, setTheatres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        theatreName: '',
        location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTheatres = async () => {
        setIsLoading(true);
        try {
            const data = await ownerService.getTheatres();
            
            // Handle different response structures safely
            if (Array.isArray(data)) {
                setTheatres(data);
            } else if (data && Array.isArray(data.data)) {
                setTheatres(data.data);
            } else {
                console.error("Unexpected response format:", data);
                setTheatres([]);
            }
        } catch (error) {
            console.error("Failed to fetch theatres", error);
            addToast("Failed to load theatres", "error");
            setTheatres([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTheatres();
    }, []);

    const handleAddTheatre = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await ownerService.addTheatre(formData);
            addToast("Theatre added successfully!", "success");
            setShowModal(false);
            setFormData({ theatreName: '', location: '' });
            fetchTheatres(); // Refresh list
        } catch (error) {
            console.error("Failed to add theatre", error);
            addToast("Failed to add theatre. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in min-h-screen text-white">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#1e1e1e] p-6 rounded-2xl border border-white/10 shadow-xl">
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        My Theatres
                    </h1>
                    <p className="text-gray-400 mt-1">Manage your theatre locations</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 font-bold"
                >
                    <Plus size={20} /> Add Theatre
                </button>
            </div>

            {/* List */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader className="animate-spin text-purple-500" size={40} />
                </div>
            ) : theatres.length === 0 ? (
                <div className="text-center py-20 bg-[#1e1e1e] rounded-2xl border border-white/10">
                    <Film size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-300">No Theatres Found</h3>
                    <p className="text-gray-500 mt-2">Get started by adding your first theatre location.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {theatres.map((theatre) => (
                        <div 
                            key={theatre.theatreId} 
                            className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all group shadow-sm hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            <div className="p-6">
                                {/* Header with Icon and Statuses */}
                                <div className="flex justify-between items-start mb-5">
                                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/10 p-3.5 rounded-xl text-purple-400 group-hover:text-white group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                                        <Film size={26} />
                                    </div>
                                    
                                    <div className="flex flex-col items-end gap-2">
                                        {/* Approval Status Badge */}
                                        <div className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${
                                            (theatre.theatreApprovalStatus === 'APPROVED' || theatre.TheatreApprovalStatus === 'APPROVED') 
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                                : (theatre.theatreApprovalStatus === 'REJECTED' || theatre.TheatreApprovalStatus === 'REJECTED')
                                                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                        }`}>
                                            {theatre.theatreApprovalStatus || theatre.TheatreApprovalStatus || 'PENDING'}
                                        </div>

                                        {/* Operational Status Dot */}
                                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg">
                                            <div className={`w-2 h-2 rounded-full ${theatre.theatreStatus === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                            <span className={`text-xs font-semibold ${theatre.theatreStatus === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>
                                                {theatre.theatreStatus === 'ACTIVE' ? 'Live' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Info */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">
                                        {theatre.theatreName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                        <MapPin size={14} className="text-gray-500" />
                                        <span className="truncate">{theatre.location}</span>
                                    </div>
                                </div>

                                {/* Stats Footer */}
                                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wide font-semibold block mb-1">Screens</span>
                                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                                            <Monitor size={16} className="text-blue-400" />
                                            {theatre.screens?.length || 0}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wide font-semibold block mb-1">Total Shows</span>
                                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                                            <Film size={16} className="text-pink-400" />
                                            0
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => navigate(`/owner/theatres/${theatre.theatreId}/stats`)}
                                        className="bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold text-sm transition-colors border border-white/5"
                                    >
                                        Stats
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/owner/theatres/${theatre.theatreId}/manage`)}
                                        className="bg-purple-600/10 hover:bg-purple-600 hover:text-white text-purple-400 py-2 rounded-lg font-bold text-sm transition-all border border-purple-500/20"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-[#1e1e1e] rounded-2xl w-full max-w-md border border-white/10 shadow-2xl p-6 relative">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-1">Add New Theatre</h2>
                        <p className="text-gray-400 text-sm mb-6">Enter the details for your new location.</p>

                        <form onSubmit={handleAddTheatre} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Theatre Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="e.g. Grand Cinema Plaza"
                                    value={formData.theatreName}
                                    onChange={(e) => setFormData({...formData, theatreName: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="e.g. Downtown, Mumbai"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? <Loader className="animate-spin" size={20} /> : <Plus size={20} />}
                                {isSubmitting ? 'Adding...' : 'Add Theatre'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheatreList;

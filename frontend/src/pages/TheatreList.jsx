import React, { useState } from 'react';
import { MapPin, Monitor, Star, ChevronRight, Plus } from 'lucide-react';
import AddTheatreModal from '../components/owner/AddTheatreModal';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import ownerService from '../services/ownerService';
import { useEffect } from 'react';

const TheatreList = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [theatres, setTheatres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTheatres = async () => {
            setIsLoading(true);
            const data = await ownerService.getTheatres();
            setTheatres(data);
            setIsLoading(false);
        };
        fetchTheatres();
    }, []);

    const handleAddTheatre = async (data) => {
        // Optimistic UI Update or Refetch
        const newTheatre = await ownerService.addTheatre(data);
        setTheatres([...theatres, newTheatre]);
        addToast(`${newTheatre.name} added successfully!`, 'success');
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Your Theatres</h1>
                    <p className="text-gray-400 mt-1">Manage your properties and screens.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-600/20"
                >
                    <Plus size={20} /> Add Theatre
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {(isLoading ? [] : theatres || []).map((theatre) => (
                    <div
                        key={theatre.id}
                        className="group bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 flex flex-col md:flex-row"
                    >
                        {/* Image Section */}
                        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 md:hidden"></div>
                            <img
                                src={theatre.image}
                                alt={theatre.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <span className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold ${theatre.status === 'OPEN' ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}`}>
                                {theatre.status}
                            </span>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{theatre.name}</h3>
                                    <div className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/10 px-2 py-1 rounded-lg">
                                        <Star size={16} fill="currentColor" /> {theatre.rating}
                                    </div>
                                </div>

                                <div className="space-y-2 text-gray-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-gray-500" />
                                        {theatre.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Monitor size={18} className="text-gray-500" />
                                        {Array.isArray(theatre.screens) ? theatre.screens.length : (theatre.screens || 0)} Screens
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                                <button
                                    onClick={() => navigate(`/owner/theatres/${theatre.id}`)}
                                    className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Manage <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddTheatreModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTheatre}
            />
        </div>
    );
};

export default TheatreList;

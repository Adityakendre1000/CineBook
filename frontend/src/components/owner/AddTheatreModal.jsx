import React, { useState } from 'react';
import { X, MapPin, Building } from 'lucide-react';

const AddTheatreModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        city: '',
        type: 'Multiplex'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ name: '', location: '', city: '', type: 'Multiplex' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <h2 className="text-xl font-bold text-white">Add New Theatre</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Theatre Name</label>
                        <div className="relative">
                            <Building className="absolute left-4 top-3.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                                placeholder="e.g. CineBook IMAX"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Location / Area</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                                placeholder="e.g. Phoenix Mall, Viman Nagar"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">City</label>
                        <input
                            type="text"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                            placeholder="e.g. Pune"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-all transform hover:scale-[1.02]">
                            Create Theatre
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTheatreModal;

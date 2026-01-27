import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Monitor } from 'lucide-react';
import { MOCK_MOVIES } from '../../data/mockData';

const SEAT_COUNTS = {
    NORMAL: 45, // Rows A, B, C (3 * 15)
    PRIME: 30,  // Rows D, E (2 * 15)
    RECLINER: 12 // Row F (1 * 12)
};

const AddShowModal = ({ isOpen, onClose, theatreName, onSubmit, screens = [] }) => {
    const [formData, setFormData] = useState({
        movieId: '',
        screenId: '',
        date: '',
        time: '',
        priceNormal: '',
        pricePrime: '',
        priceRecliner: ''
    });

    const [pricingPreview, setPricingPreview] = useState(null);

    useEffect(() => {
        const normal = parseFloat(formData.priceNormal) || 0;
        const prime = parseFloat(formData.pricePrime) || 0;
        const recliner = parseFloat(formData.priceRecliner) || 0;

        if (normal > 0 || prime > 0 || recliner > 0) {
            setPricingPreview({
                totalPotential: (
                    (normal * SEAT_COUNTS.NORMAL) +
                    (prime * SEAT_COUNTS.PRIME) +
                    (recliner * SEAT_COUNTS.RECLINER)
                )
            });
        } else {
            setPricingPreview(null);
        }
    }, [formData.priceNormal, formData.pricePrime, formData.priceRecliner]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct show object
        const selectedMovie = MOCK_MOVIES.find(m => m.id === parseInt(formData.movieId));
        if (!selectedMovie) return;

        const newShow = {
            id: Date.now(),
            movie: selectedMovie.title,
            time: formData.time,
            screen: formData.screenId,
            prices: {
                NORMAL: formData.priceNormal,
                PRIME: formData.pricePrime,
                RECLINER: formData.priceRecliner
            }
        };
        onSubmit(newShow);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Add New Show</h2>
                        <p className="text-gray-400 text-sm mt-1">{theatreName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-8">
                    <form id="add-show-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Movie Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Select Movie</label>
                            <select
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                value={formData.movieId}
                                onChange={(e) => setFormData({ ...formData, movieId: e.target.value })}
                                required
                            >
                                <option value="">Select a movie...</option>
                                {MOCK_MOVIES.map((m) => (
                                    <option key={m.id} value={m.id}>{m.title} ({m.duration})</option>
                                ))}
                            </select>
                        </div>

                        {/* Schedule Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                                    <Monitor size={14} /> Screen
                                </label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                                    value={formData.screenId}
                                    onChange={(e) => setFormData({ ...formData, screenId: e.target.value })}
                                    required
                                >
                                    <option value="">Select...</option>
                                    {screens.map(screen => (
                                        <option key={screen.id} value={screen.id}>
                                            {screen.name} ({screen.type})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                                    <Calendar size={14} /> Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                                    <Clock size={14} /> Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Pricing Section - MANUAL INPUTS */}
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <label className="block text-sm font-bold text-yellow-500 mb-4 uppercase tracking-wide">Seat Pricing & Layout</label>

                            <div className="grid grid-cols-1 gap-4 mb-4">
                                {/* Normal */}
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-white/5">
                                    <div className="w-24">
                                        <span className="block text-gray-400 text-xs uppercase font-bold">Standard</span>
                                        <span className="text-gray-600 text-[10px]">{SEAT_COUNTS.NORMAL} seats</span>
                                    </div>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            className="w-full bg-transparent border-none text-white focus:ring-0 pl-8 font-mono font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={formData.priceNormal}
                                            onChange={(e) => setFormData({ ...formData, priceNormal: e.target.value })}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Prime */}
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-white/5">
                                    <div className="w-24">
                                        <span className="block text-purple-400 text-xs uppercase font-bold">Prime</span>
                                        <span className="text-gray-600 text-[10px]">{SEAT_COUNTS.PRIME} seats</span>
                                    </div>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            className="w-full bg-transparent border-none text-white focus:ring-0 pl-8 font-mono font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={formData.pricePrime}
                                            onChange={(e) => setFormData({ ...formData, pricePrime: e.target.value })}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Recliner */}
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-white/5">
                                    <div className="w-24">
                                        <span className="block text-yellow-400 text-xs uppercase font-bold">Recliner</span>
                                        <span className="text-gray-600 text-[10px]">{SEAT_COUNTS.RECLINER} seats</span>
                                    </div>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            className="w-full bg-transparent border-none text-white focus:ring-0 pl-8 font-mono font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={formData.priceRecliner}
                                            onChange={(e) => setFormData({ ...formData, priceRecliner: e.target.value })}
                                            required
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Total Estimation */}
                            {pricingPreview && (
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-sm font-bold text-gray-400">Est. Total Revenue (Full House)</span>
                                    <span className="text-xl font-mono font-bold text-green-400">₹{pricingPreview.totalPotential.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button type="submit" form="add-show-form" className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all transform hover:scale-105">
                        Create Show
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddShowModal;

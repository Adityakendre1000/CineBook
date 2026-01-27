import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Monitor } from 'lucide-react';
import { MOCK_MOVIES } from '../../data/mockData';

const SEAT_MULTIPLIERS = {
    NORMAL: 1.0,
    PRIME: 1.5,
    RECLINER: 3.0
};

// Mock Counts for the static layout
const SEAT_COUNTS = {
    NORMAL: 45, // Rows A, B, C (3 * 15)
    PRIME: 30,  // Rows D, E (2 * 15)
    RECLINER: 12 // Row F (1 * 12)
};

const AddShowModal = ({ isOpen, onClose, theatreName, onSubmit }) => {
    const [formData, setFormData] = useState({
        movieId: '',
        screenId: '',
        date: '',
        time: '',
        basePrice: ''
    });

    const [pricingPreview, setPricingPreview] = useState(null);

    useEffect(() => {
        if (formData.basePrice) {
            const base = parseFloat(formData.basePrice);
            if (!isNaN(base)) {
                setPricingPreview({
                    NORMAL: base * SEAT_MULTIPLIERS.NORMAL,
                    PRIME: base * SEAT_MULTIPLIERS.PRIME,
                    RECLINER: base * SEAT_MULTIPLIERS.RECLINER,
                    totalPotential: (
                        (base * SEAT_MULTIPLIERS.NORMAL * SEAT_COUNTS.NORMAL) +
                        (base * SEAT_MULTIPLIERS.PRIME * SEAT_COUNTS.PRIME) +
                        (base * SEAT_MULTIPLIERS.RECLINER * SEAT_COUNTS.RECLINER)
                    )
                });
            } else {
                setPricingPreview(null);
            }
        } else {
            setPricingPreview(null);
        }
    }, [formData.basePrice]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct show object
        const selectedMovie = MOCK_MOVIES.find(m => m.id === parseInt(formData.movieId));
        if (!selectedMovie) return;

        const newShow = {
            id: Date.now(),
            movie: selectedMovie.title,
            time: formData.time, // simplified
            screen: formData.screenId,
            basePrice: formData.basePrice
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
                                    <option value="1">Screen 1 (Standard)</option>
                                    <option value="2">Screen 2 (IMAX)</option>
                                    <option value="3">Screen 3 (Gold)</option>
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

                        {/* Pricing Section */}
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <label className="block text-sm font-bold text-yellow-500 mb-4 uppercase tracking-wide">Dynamic Pricing Setup</label>

                            <div className="mb-4">
                                <label className="text-sm text-gray-400 mb-1 block">Base Ticket Price (INR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                    <input
                                        type="number"
                                        placeholder="e.g. 200"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-lg font-bold"
                                        value={formData.basePrice}
                                        onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Pricing Preview Table */}
                            {pricingPreview && (
                                <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5 text-gray-400 font-bold uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-2">Tier</th>
                                                <th className="px-4 py-2">Multiplier</th>
                                                <th className="px-4 py-2 text-right">Final Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr>
                                                <td className="px-4 py-2 text-gray-300">Normal</td>
                                                <td className="px-4 py-2 text-gray-500">1.0x</td>
                                                <td className="px-4 py-2 text-right font-mono font-bold text-white">₹{pricingPreview.NORMAL.toFixed(0)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-purple-400">Prime</td>
                                                <td className="px-4 py-2 text-gray-500">1.5x</td>
                                                <td className="px-4 py-2 text-right font-mono font-bold text-white">₹{pricingPreview.PRIME.toFixed(0)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-yellow-400">Recliner</td>
                                                <td className="px-4 py-2 text-gray-500">3.0x</td>
                                                <td className="px-4 py-2 text-right font-mono font-bold text-white">₹{pricingPreview.RECLINER.toFixed(0)}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-green-500/10 border-t border-green-500/20">
                                            <tr>
                                                <td colSpan="2" className="px-4 py-2 text-green-400 font-bold">Est. Revenue (Full House)</td>
                                                <td className="px-4 py-2 text-right font-mono font-bold text-green-400">₹{pricingPreview.totalPotential.toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
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

import React, { useState } from 'react';
import { X, Monitor, Users, Info } from 'lucide-react';

const AddScreenModal = ({ isOpen, onClose, onSubmit }) => {
    // Layout capacities
    const LAYOUT_CAPACITIES = {
        'Small': 100,
        'Medium': 180,
        'Large': 250
    };

    const [formData, setFormData] = useState({
        name: '',
        type: 'Standard',
        layout: 'Medium',
        capacity: 180 // Default to Medium
    });

    if (!isOpen) return null;

    const handleLayoutChange = (e) => {
        const newLayout = e.target.value;
        setFormData({
            ...formData,
            layout: newLayout,
            capacity: LAYOUT_CAPACITIES[newLayout]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({
            name: '',
            type: 'Standard',
            layout: 'Medium',
            capacity: LAYOUT_CAPACITIES['Medium']
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <h2 className="text-xl font-bold text-white">Add New Screen</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Screen Name / Number</label>
                        <div className="relative">
                            <Monitor className="absolute left-4 top-3.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
                                placeholder="e.g. Screen 1"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Screen Type</label>
                            <select
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Standard">Standard</option>
                                <option value="IMAX">IMAX</option>
                                <option value="INOX">INOX</option>
                                <option value="PVR">PVR</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Layout Size</label>
                            <select
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                                value={formData.layout}
                                onChange={handleLayoutChange}
                            >
                                <option value="Small">Small (100)</option>
                                <option value="Medium">Medium (180)</option>
                                <option value="Large">Large (250)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Total Capacity</label>
                        <div className="relative">
                            <Users className="absolute left-4 top-3.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#151515] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-gray-400 focus:outline-none cursor-not-allowed font-mono"
                                value={formData.capacity}
                                readOnly
                            />
                        </div>
                        <p className="text-xs text-blue-400/80 mt-2 flex items-center gap-1">
                            <Info size={12} />
                            Based on {formData.layout} layout configuration.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02]">
                            Add Screen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScreenModal;

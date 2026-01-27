import React, { useState, useEffect } from 'react';
import { X, Monitor, Users, Info } from 'lucide-react';

const AddScreenModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    // Layout capacities & structures
    const LAYOUT_CONFIGS = {
        'Small': { capacity: 100, rows: ['A', 'B', 'C', 'D', 'E'] },
        'Medium': { capacity: 180, rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
        'Large': { capacity: 250, rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'] }
    };

    const SEAT_TYPES = ['NORMAL', 'PRIME', 'RECLINER'];

    const [formData, setFormData] = useState({
        name: '', 
        type: 'Standard',
        layout: 'Medium',
        layoutType: 'MEDIUM',
        capacity: 180, 
        rowConfig: {} 
    });

    // Initialize/Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Formatting initial data to match form structure
                // Assume initialData comes with layoutType like "MEDIUM" or "Medium"
                // We need to map it correctly.
                const layout = initialData.layoutType 
                    ? (initialData.layoutType.charAt(0).toUpperCase() + initialData.layoutType.slice(1).toLowerCase()) 
                    : (initialData.layout || 'Medium');

                setFormData({
                    name: initialData.name || '',
                    type: initialData.type || 'Standard',
                    layout: layout,
                    layoutType: layout.toUpperCase(),
                    capacity: initialData.totalSeats || LAYOUT_CONFIGS[layout]?.capacity || 180,
                    rowConfig: initialData.rowConfig || {}
                });
            } else {
                // Reset for Add Mode
                setFormData({
                    name: '',
                    type: 'Standard',
                    layout: 'Medium',
                    layoutType: 'MEDIUM',
                    capacity: 180,
                    rowConfig: {}
                });
                
                // Set default row config for Medium
                const rows = LAYOUT_CONFIGS['Medium'].rows;
                const initialConfig = {};
                rows.forEach(row => {
                    if (['J', 'K'].includes(row)) initialConfig[row] = 'RECLINER';
                    else if (['E', 'F', 'G', 'H', 'I'].includes(row)) initialConfig[row] = 'PRIME';
                    else initialConfig[row] = 'NORMAL';
                });
                setFormData(prev => ({ ...prev, rowConfig: initialConfig }));
            }
        }
    }, [isOpen, initialData]);

    // Handle Layout change update row config default
    useEffect(() => {
        if(isOpen && !initialData) { // Only auto-set config if NOT editing (or if user explicitly changes layout during edit)
             const rows = LAYOUT_CONFIGS[formData.layout]?.rows || [];
             if(rows.length > 0 && Object.keys(formData.rowConfig).length === 0){
                 const initialConfig = {};
                 rows.forEach(row => {
                     if (['J', 'K'].includes(row) || (formData.layout === 'Small' && row === 'E')) initialConfig[row] = 'RECLINER';
                     else if (['E', 'F', 'G', 'H', 'I'].includes(row) || (formData.layout === 'Small' && ['C','D'].includes(row))) initialConfig[row] = 'PRIME';
                     else initialConfig[row] = 'NORMAL';
                 });
                 setFormData(prev => ({ ...prev, rowConfig: initialConfig }));
             }
        }
    }, [formData.layout, isOpen]);


    if (!isOpen) return null;

    const handleLayoutChange = (e) => {
        const newLayout = e.target.value;
        const rows = LAYOUT_CONFIGS[newLayout].rows;
        
        // Reset config for new layout
        const newConfig = {};
        rows.forEach(row => {
             if (['J', 'K'].includes(row) || (newLayout === 'Small' && row === 'E')) newConfig[row] = 'RECLINER';
             else if (['E', 'F', 'G', 'H', 'I'].includes(row) || (newLayout === 'Small' && ['C','D'].includes(row))) newConfig[row] = 'PRIME';
             else newConfig[row] = 'NORMAL';
        });

        setFormData(prev => ({
            ...prev,
            layout: newLayout,
            layoutType: newLayout.toUpperCase(),
            capacity: LAYOUT_CONFIGS[newLayout].capacity,
            rowConfig: newConfig
        }));
    };

    const handleRowTypeChange = (row, type) => {
        setFormData(prev => ({
            ...prev,
            rowConfig: {
                ...prev.rowConfig,
                [row]: type
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: initialData?.id, // specific handling if needed
            theatreId: formData.theatreId,
            name: formData.name, // Include name for update
            type: formData.type,
            layoutType: formData.layoutType,
            rowConfig: formData.rowConfig,
            totalSeats: formData.capacity
        };
        onSubmit(payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                    <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Screen' : 'Add New Screen'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                   
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Screen Name / Number</label>
                        <div className="relative">
                            <Monitor className="absolute left-4 top-3.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 placeholder:text-gray-600 font-bold"
                                placeholder={initialData ? "" : "Display Name (e.g. Screen 1)"}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                readOnly={!!initialData} // Maybe allow name edit? User said "Modify a screen". Let's allow it if backend supports. But Plan said screen number is auto-inc. Let's make it readOnly if generated. Name is display prop.
                            />
                             {initialData && <span className="absolute right-4 top-3.5 text-xs text-gray-500">Auto-Generated ID</span>}
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
                                disabled={!!initialData} // Changing layout is complex (reseating), better disable for Edit? User said "Modify". If we allow layout change, we regen seats. Let's allow it.
                            >
                                <option value="Small">Small (100 Seats)</option>
                                <option value="Medium">Medium (180 Seats)</option>
                                <option value="Large">Large (250 Seats)</option>
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
                    </div>

                    {/* Row Configuration Section */}
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                        <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase flex items-center gap-2">
                            <Monitor size={16} /> Row Configuration
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2">
                            {LAYOUT_CONFIGS[formData.layout]?.rows.map(row => (
                                <div key={row} className="bg-[#1e1e1e] p-2 rounded-lg border border-white/5">
                                    <div className="text-xs text-gray-500 mb-1 font-bold">Row {row}</div>
                                    <select
                                        className="w-full bg-black/40 border border-white/10 rounded text-xs py-1 px-2 text-white focus:outline-none focus:border-blue-500"
                                        value={formData.rowConfig[row] || 'NORMAL'}
                                        onChange={(e) => handleRowTypeChange(row, e.target.value)}
                                    >
                                        {SEAT_TYPES.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-blue-400/80 mt-3 flex items-center gap-1">
                            <Info size={12} />
                            Configure seat types. <span className="text-red-400 ml-1">Warning: Changing layout/config resets existing seat data.</span>
                        </p>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02]">
                            {initialData ? 'Save Changes' : 'Add Screen'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScreenModal;

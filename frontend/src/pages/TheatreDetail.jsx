import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Calendar, Info, Plus, Trash2, Edit2, MapPin } from 'lucide-react';
import SeatLayout from '../components/theatre/SeatLayout';
import AddShowModal from '../components/owner/AddShowModal';

import AddScreenModal from '../components/owner/AddScreenModal';
import { useToast } from '../context/ToastContext';
import ownerService from '../services/ownerService';
import { useEffect } from 'react';

const TheatreDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('screens'); // overview, screens, shows
    const [isAddShowOpen, setIsAddShowOpen] = useState(false);
    const [isAddScreenOpen, setIsAddScreenOpen] = useState(false);
    // const [shows, setShows] = useState(MOCK_SHOWS); // Removed initial mock state
    const [shows, setShows] = useState([]);
    const [theatre, setTheatre] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const theatreData = await ownerService.getTheatreById(id);
            setTheatre(theatreData);

            const showsData = await ownerService.getShows(id);
            setShows(showsData);

            setLoading(false);
        };
        fetchData();
    }, [id]);


    const handleAddShow = async (newShow) => {
        const addedShow = await ownerService.addShow(newShow);
        setShows([...shows, addedShow]);
        addToast('Show scheduled successfully!', 'success');
    };

    const handleAddScreen = async (newScreen) => {
        console.log("New Screen:", newScreen);
        const addedScreen = await ownerService.addScreen(id, newScreen);
        // Optimistically update theatre screens
        setTheatre({
            ...theatre,
            screens: [...theatre.screens, addedScreen]
        });
        addToast(`${newScreen.name} added successfully!`, 'success');
    };

    const handleDisableScreen = async (screenId) => {
        const screenToUpdate = theatre.screens.find(s => s.id === screenId);
        // Default to ACTIVE if status is undefined
        const currentStatus = screenToUpdate.status || 'ACTIVE';
        const newStatus = currentStatus === 'DISABLED' ? 'ACTIVE' : 'DISABLED';

        if (window.confirm(`Are you sure you want to ${newStatus === 'DISABLED' ? 'disable' : 'enable'} this screen?`)) {
            // Optimistically update
            setTheatre({
                ...theatre,
                screens: theatre.screens.map(s =>
                    s.id === screenId ? { ...s, status: newStatus } : s
                )
            });
            addToast(`Screen ${newStatus === 'DISABLED' ? 'disabled' : 'enabled'} successfully`, 'success');
        }
    };






    if (loading || !theatre) {
        return <div className="text-white text-center p-10">Loading Theatre Details...</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => navigate('/owner/theatres')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft size={20} /> Back to Theatres
                </button>

                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-2">{theatre.name}</h1>
                        <div className="flex items-center gap-2 text-gray-400">
                            <MapPin size={18} /> {theatre.location}
                        </div>
                    </div>

                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-8 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'overview' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Overview
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('screens')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'screens' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Screens & Layouts
                    {activeTab === 'screens' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('shows')}
                    className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'shows' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    Shows & Schedule
                    {activeTab === 'shows' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-t-full"></div>}
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">About Theatre</h3>
                            <p className="text-gray-400 leading-relaxed">{theatre.description}</p>
                            <div className="mt-6 flex flex-col gap-3">
                                <div className="flex justify-between py-3 border-b border-white/5">
                                    <span className="text-gray-500">screens</span>
                                    <span className="text-white font-bold">{theatre.screens.length}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/5">
                                    <span className="text-gray-500">Owner ID</span>
                                    <span className="text-white font-bold">OWN-{Math.floor(Math.random() * 1000)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCREENS TAB */}
                {activeTab === 'screens' && (
                    <div className="space-y-8">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsAddScreenOpen(true)}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl font-bold border border-white/10 transition-colors"
                            >
                                <Plus size={18} /> Add Screen
                            </button>
                        </div>

                        <div className="grid gap-8">
                            {theatre.screens.map((screen) => (
                                <div key={screen.id} className={`bg-[#1e1e1e] rounded-2xl border ${screen.status === 'DISABLED' ? 'border-red-900/30 opacity-60' : 'border-white/10'} overflow-hidden transition-all`}>
                                    <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-white mb-1">{screen.name}</h3>
                                                {screen.status === 'DISABLED' && (
                                                    <span className="text-xs font-bold bg-red-500/20 text-red-500 px-2 py-0.5 rounded">DISABLED</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded inline-block mt-1">
                                                {screen.type}
                                            </span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleDisableScreen(screen.id)}
                                                className={`p-2 rounded-lg transition-colors ${screen.status === 'DISABLED' ? 'hover:bg-green-500/20 text-green-500' : 'hover:bg-red-500/20 text-gray-400 hover:text-red-500'}`}
                                                title={screen.status === 'DISABLED' ? "Enable Screen" : "Disable Screen"}
                                            >
                                                <Trash2 size={18} className={screen.status === 'DISABLED' ? "rotate-45" : ""} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-[#0a0a0a]">
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Seat Layout Preview ({screen.layout || 'Medium'})</h4>
                                        <div className="flex justify-center">
                                            <div className="scale-[0.8] origin-top">
                                                <SeatLayout readOnly={true} size={screen.layout || 'Medium'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SHOWS TAB */}
                {activeTab === 'shows' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-[#1e1e1e] p-4 rounded-xl border border-white/10">
                            <h3 className="font-bold text-lg text-white px-2">Today's Schedule</h3>
                            <button
                                onClick={() => setIsAddShowOpen(true)}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg shadow-red-600/20"
                            >
                                <Plus size={20} /> Add New Show
                            </button>
                        </div>

                        <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-[#0a0a0a] text-gray-400 text-xs uppercase tracking-wider font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Movie</th>
                                        <th className="px-6 py-4">Screen</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4">Occupancy</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {shows.length > 0 ? shows.map((show) => (
                                        <tr key={show.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-bold text-white">{show.movie}</td>
                                            <td className="px-6 py-4 text-gray-400">Screen {show.screen || 1}</td>
                                            <td className="px-6 py-4 text-white font-mono bg-white/5 rounded w-fit px-2 py-1 text-center inline-block">{show.time}</td>
                                            <td className="px-6 py-4 text-gray-400 text-sm">{show.occupancy || '0/150'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-xs font-bold text-green-400 bg-green-400/10 border border-green-500/20 px-2 py-1 rounded-full">Selling</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No shows scheduled for today.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <AddShowModal
                isOpen={isAddShowOpen}
                onClose={() => setIsAddShowOpen(false)}
                theatreName={theatre.name}
                onSubmit={handleAddShow}
            />

            <AddScreenModal
                isOpen={isAddScreenOpen}
                onClose={() => setIsAddScreenOpen(false)}
                onSubmit={handleAddScreen}
            />
        </div>
    );
};

export default TheatreDetail;

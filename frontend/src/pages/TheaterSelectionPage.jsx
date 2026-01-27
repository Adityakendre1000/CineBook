import React, { useState, useEffect } from 'react';
import { ChevronLeft, Building2, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById, getShowsByMovieId } from '../services/movieService';

const TheaterSelectionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Generate Next 3 Days
    const getNext3Days = () => {
        const dates = [];
        for (let i = 0; i < 3; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dates.push({
                full: d.toISOString().split('T')[0],
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate(),
            });
        }
        return dates;
    };

    const dateOptions = getNext3Days();
    const [selectedDate, setSelectedDate] = useState(dateOptions[0].full);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieData, showsData] = await Promise.all([
                    getMovieById(id),
                    getShowsByMovieId(id)
                ]);

                if (movieData && movieData.data) {
                    const backendMovie = movieData.data;
                    setMovie({
                        id: backendMovie.movieId,
                        title: backendMovie.title,
                        genre: backendMovie.genre,
                        duration: `${backendMovie.durationMinutes} mins`,
                    });
                }

                if (showsData && showsData.data) {
                    setShows(showsData.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Group shows by theater and filter by selected date
    const getFilteredTheaters = () => {
        if (!shows.length) return [];

        const filteredShows = shows.filter(show =>
            show.showTime.startsWith(selectedDate)
        );

        const theaterMap = new Map();

        filteredShows.forEach(show => {
            if (!theaterMap.has(show.theatreName)) {
                theaterMap.set(show.theatreName, {
                    id: show.screenId, // Using screenId as unique key for now, ideally should be theaterId
                    name: show.theatreName,
                    location: show.location,
                    times: []
                });
            }
            const timeString = new Date(show.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            theaterMap.get(show.theatreName).times.push(timeString);
        });

        return Array.from(theaterMap.values());
    };

    const filteredTheaters = getFilteredTheaters();

    // --- Handlers ---
    const handleBack = () => {
        navigate(-1);
    }
    const handleTimeSelect = (theater, time) => {
        // Construct the URL with query parameters
        const url = `/movie/seats/${theater.id}/${movie.id}?date=${selectedDate}&time=${time}&theaterName=${encodeURIComponent(theater.name)}&price=15`;
        navigate(url);
    };

    if (loading) return <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">{error}</div>;
    if (!movie) return <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">Movie not found</div>;

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
            <div className="max-w-4xl mx-auto pt-8 pb-20">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-400 hover:text-white group"
                    >
                        <ChevronLeft size={20} className="mr-1" /> Back to Movie
                    </button>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{movie.duration} • {movie.genre}</p>
                    </div>
                </div>

                {/* Date Selector Strip */}
                <div className="mb-8 px-4">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {dateOptions.map((dateObj) => (
                            <button
                                key={dateObj.full}
                                onClick={() => setSelectedDate(dateObj.full)}
                                className={`
                    flex flex-col items-center justify-center min-w-[5rem] px-4 py-3 rounded-xl border transition-all duration-300
                    ${selectedDate === dateObj.full
                                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                                    }
                    `}
                            >
                                <span className="text-xs font-medium uppercase tracking-wider mb-1 opacity-80">{dateObj.day}</span>
                                <span className="text-xl font-bold">{dateObj.date}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theater List */}
                <div className="space-y-4 px-4">
                    {filteredTheaters.length > 0 ? (
                        filteredTheaters.map((theater, index) => (
                            <div key={index} className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 group hover:border-white/20 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                                    {/* Theater Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gray-800 rounded-xl text-gray-400 group-hover:text-red-500 transition-colors">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">{theater.name}</h3>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <MapPin size={14} /> {theater.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Pills */}
                                    <div className="flex flex-wrap gap-3">
                                        {theater.times.map((time, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleTimeSelect(theater, time)}
                                                className="px-4 py-2 rounded-lg border border-green-500/30 text-green-400 text-sm font-medium hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400 text-center py-8">No shows available for this date</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TheaterSelectionPage;

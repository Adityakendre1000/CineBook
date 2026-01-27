import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BookingView from '../components/movie/MovieSeats';
import { getMovieById } from '../services/movieService';

const SeatSelectionPage = () => {
    const { theaterId, movieId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const theaterName = searchParams.get('theaterName');
    const ticketPrice = parseFloat(searchParams.get('price')) || 15; // Default price if not passed

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Mock occupied seats for now
    const [occupiedSeats, setOccupiedSeats] = useState(['A3', 'B4', 'C1', 'C2']);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await getMovieById(movieId);
                if (response && response.data) {
                    const backendMovie = response.data;
                    setMovie({
                        id: backendMovie.movieId,
                        title: backendMovie.title,
                        genre: backendMovie.genre,
                        rating: backendMovie.rating,
                        duration: `${backendMovie.durationMinutes} mins`,
                        image: backendMovie.posterUrl || 'https://via.placeholder.com/1280x720',
                    });
                } else {
                    setError("Movie not found");
                }
            } catch (err) {
                console.error("Error fetching movie:", err);
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [movieId]);

    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handlePayment = () => {
        // Navigate to payment or show confirmation
        alert(`Proceeding to payment for seats: ${selectedSeats.join(', ')}`);
    };

    if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading...</div>;
    if (error) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">{error}</div>;

    return (
        <BookingView
            movie={movie}
            theater={{ id: theaterId, name: theaterName }}
            date={date}
            time={time}
            selectedSeats={selectedSeats}
            occupiedSeats={occupiedSeats}
            onSeatClick={handleSeatClick}
            onBack={() => navigate(-1)}
            onPayment={handlePayment}
            ticketPrice={ticketPrice}
        />
    );
};

export default SeatSelectionPage;

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BookingView from '../components/movie/MovieSeats';
import bookingService from '../services/bookingService';

const SeatSelectionPage = () => {
    const { showId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const theaterName = searchParams.get('theaterName');

    const [seatLayout, setSeatLayout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeatLayout = async () => {
            try {
                const response = await bookingService.getShowSeats(showId);
                console.log("Seat layout response:", response);
                
                if (response && response.data) {
                    setSeatLayout(response.data);
                } else {
                    setError("Seat layout not found");
                }
            } catch (err) {
                console.error("Error fetching seat layout:", err);
                setError("Failed to load seat layout");
            } finally {
                setLoading(false);
            }
        };
        fetchSeatLayout();
    }, [showId]);

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

    if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading seat layout...</div>;
    if (error) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">{error}</div>;
    if (!seatLayout) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">No seat layout available</div>;

    // Extract movie info from first seat (all seats belong to same show)
    const firstSeat = seatLayout.seatsByRow[seatLayout.rows[0]]?.[0];
    const movie = {
        title: "Movie Title", // This will be shown in BookingView
    };

    return (
        <BookingView
            seatLayout={seatLayout}
            theater={{ name: theaterName }}
            date={date}
            time={time}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            onBack={() => navigate(-1)}
            onPayment={handlePayment}
        />
    );
};

export default SeatSelectionPage;

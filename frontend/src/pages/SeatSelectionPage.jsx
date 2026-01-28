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

    /* ---------------- FETCH SEATS ---------------- */
    useEffect(() => {
        const fetchSeatLayout = async () => {
            try {
                const response = await bookingService.getShowSeats(showId);
                if (response?.data) {
                    setSeatLayout(response.data);
                } else {
                    setError("Seat layout not found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load seat layout");
            } finally {
                setLoading(false);
            }
        };
        fetchSeatLayout();
    }, [showId]);

    /* ---------------- SEAT TOGGLE ---------------- */
    const handleSeatClick = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    /* ---------------- PAYMENT FLOW ---------------- */
    const handlePayment = async (totalAmount) => {
        try {
            // 1️⃣ Initiate booking (LOCK seats + Razorpay order)
            const bookingRes = await bookingService.initiateBooking({
                showId: Number(showId),
                seatIds: selectedSeats
            });

            const { razorpayOrderId, bookingId, amount, currency } = bookingRes.data;

            // 2️⃣ Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount * 100, // paise
                currency,
                name: "CineBook",
                description: "Movie Ticket Booking",
                order_id: razorpayOrderId,

                handler: async (response) => {
                    try {
                        // 3️⃣ Verify payment
                        await bookingService.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        // 4️⃣ Success → redirect
                        navigate("/booking-success", { state: { bookingId } });

                    } catch (err) {
                        console.error("Payment verification failed", err);
                        alert("Payment verification failed");
                    }
                },

                modal: {
                    ondismiss: async () => {
                        // 5️⃣ Payment cancelled
                        await bookingService.paymentFailure({
                            razorpayOrderId
                        });
                        alert("Payment cancelled");
                    }
                },

                theme: {
                    color: "#dc2626"
                }
            };

            // 6️⃣ Open Razorpay
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Booking initiation failed", err);
            alert(err.response?.data?.error || "Booking failed");
        }
    };

    /* ---------------- UI STATES ---------------- */
    if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading seat layout...</div>;
    if (error) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">{error}</div>;
    if (!seatLayout) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">No seat layout available</div>;

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

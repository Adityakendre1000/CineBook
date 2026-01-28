import axiosInstance from "./axiosInstance";

const PUBLIC_API = "/public";
const USER_API = "/user"; // JWT protected

const bookingService = {
    /* ---------------- PUBLIC ---------------- */

    // Get seat layout for a show
    getShowSeats: async (showId) => {
        const response = await axiosInstance.get(
            `${PUBLIC_API}/shows/${showId}/seats`
        );
        return response.data;
    },

    // Get shows for a movie
    getMovieShows: async (movieId) => {
        const response = await axiosInstance.get(
            `${PUBLIC_API}/movies/${movieId}/shows`
        );
        return response.data;
    },

    /* ---------------- BOOKING ---------------- */

    // Initiate booking (LOCK seats + create Razorpay order)
    initiateBooking: async ({ showId, seatIds }) => {
        const response = await axiosInstance.post(
            "/user/booking/initiate",
            {
                showId,
                showSeatIds: seatIds
            }
        );
        return response.data;
    }
    ,

    /* ---------------- PAYMENTS ---------------- */

    // Verify Razorpay payment
    verifyPayment: async ({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    }) => {
        const response = await axiosInstance.post(
            `${USER_API}/payments/verify`,
            {
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature,
            }
        );
        return response.data;
    },

    // Handle payment failure / cancellation
    paymentFailure: async ({ razorpayOrderId }) => {
        const response = await axiosInstance.post(
            `${USER_API}/payments/failure`,
            { razorpayOrderId }
        );
        return response.data;
    },
    // Get booking details by bookingId
    getBookingById: async (bookingId) => {
        const response = await axiosInstance.get(
            `/user/bookings/${bookingId}`
        );
        return response.data;
    },

};

export default bookingService;

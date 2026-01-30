import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Loader2 } from 'lucide-react';
import { getMovieById, submitMovieFeedback } from '../services/movieService';
import { useToast } from '../context/ToastContext';
import Footer from '../components/Footer';

const FeedbackPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie:", error);
                showToast("Failed to load movie details", "error");
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovie();
        }
    }, [movieId, showToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            showToast("Please select a star rating", "error");
            return;
        }

        setSubmitting(true);
        try {
            await submitMovieFeedback(movieId, { rating, review });
            showToast("Thank you for your feedback!", "success");
            navigate(`/movie/${movieId}`); // Redirect back to movie details
        } catch (error) {
            console.error("Feedback submission error:", error);
            showToast(error.response?.data?.message || "Failed to submit feedback", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-400">Movie not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <>
        <div className="max-w-2xl mx-auto bg-[#222] p-8 rounded-lg shadow-xl border border-gray-800 mt-10">
            <h1 className="text-3xl font-bold mb-2 text-white">Rate & Review</h1>
            <h2 className="text-xl text-gray-400 mb-8">
                How was your experience watching <span className="text-red-500 font-semibold">{movie.title}</span>?
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Star Rating Section */}
                <div className="flex flex-col items-center space-y-2 mb-6">
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star
                                    size={40}
                                    fill={(hoveredRating || rating) >= star ? "#ef4444" : "transparent"}
                                    className={(hoveredRating || rating) >= star ? "text-red-500" : "text-gray-600"}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400">
                        {rating > 0 ? `You rated this ${rating} out of 5 stars` : "Click to rate"}
                    </p>
                </div>

                {/* Review Textarea */}
                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
                        Write a review (optional)
                    </label>
                    <textarea
                        id="review"
                        rows="5"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Tell us what you liked or didn't like..."
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-4 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none leading-relaxed"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Feedback"
                        )}
                    </button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default FeedbackPage;

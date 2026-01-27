import React from 'react';

const SEAT_TYPE_COLORS = {
    NORMAL: 'bg-gray-600',
    PRIME: 'bg-purple-600',
    RECLINER: 'bg-yellow-600',
};

const SEAT_TYPE_LABELS = {
    NORMAL: 'Normal',
    PRIME: 'Prime',
    RECLINER: 'Recliner',
};

const SeatLayout = ({ layout = [], readOnly = true }) => {
    // Default static layout if none provided
    const seatLayout = layout.length > 0 ? layout : [
        { row: 'A', seats: Array(15).fill({ type: 'NORMAL', status: 'AVAILABLE' }) },
        { row: 'B', seats: Array(15).fill({ type: 'NORMAL', status: 'AVAILABLE' }) },
        { row: 'C', seats: Array(15).fill({ type: 'NORMAL', status: 'AVAILABLE' }) },
        { row: 'D', seats: Array(15).fill({ type: 'PRIME', status: 'AVAILABLE' }) },
        { row: 'E', seats: Array(15).fill({ type: 'PRIME', status: 'AVAILABLE' }) },
        { row: 'F', seats: Array(12).fill({ type: 'RECLINER', status: 'AVAILABLE' }) }, // Fewer seats for Recliners
    ];

    return (
        <div className="w-full bg-[#0a0a0a] p-6 rounded-2xl overflow-x-auto border border-white/10">

            {/* Screen Visual */}
            <div className="mb-10 flex flex-col items-center">
                <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.5)]"></div>
                <p className="mt-2 text-gray-400 text-sm uppercase tracking-widest text-center">Screen This Way</p>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col gap-3 items-center min-w-[600px]">
                {seatLayout.map((rowItem, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-4">
                        <span className="w-6 text-gray-400 font-bold text-sm text-center">{rowItem.row}</span>
                        <div className="flex gap-2">
                            {rowItem.seats.map((seat, seatIndex) => (
                                <div
                                    key={`${rowItem.row}-${seatIndex}`}
                                    className={`
                    w-8 h-8 rounded-t-lg rounded-b-md flex items-center justify-center text-[10px] font-bold text-white/90 shadow-sm
                    ${SEAT_TYPE_COLORS[seat.type]}
                    hover:brightness-110 transition-all cursor-default
                  `}
                                    title={`${rowItem.row}${seatIndex + 1} - ${SEAT_TYPE_LABELS[seat.type]}`}
                                >
                                    {seatIndex + 1}
                                </div>
                            ))}
                        </div>
                        <span className="w-6 text-gray-400 font-bold text-sm text-center">{rowItem.row}</span>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-6">
                {Object.keys(SEAT_TYPE_COLORS).map((type) => (
                    <div key={type} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded ${SEAT_TYPE_COLORS[type]}`}></div>
                        <span className="text-gray-300 text-sm">{SEAT_TYPE_LABELS[type]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatLayout;

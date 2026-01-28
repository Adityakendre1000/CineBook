import React from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CreditCard } from 'lucide-react';

const BookingView = ({ 
  seatLayout,
  theater, 
  date, 
  time, 
  selectedSeats, 
  onSeatClick, 
  onBack, 
  onPayment
}) => {
  if (!seatLayout) {
    return <div className="text-white">Loading...</div>;
  }

  const { rows, seatsByRow, priceMap, layoutType, availableSeats, totalSeats } = seatLayout;

  // Calculate total price based on selected seats
  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach(seatNumber => {
      // Find the seat in seatsByRow
      for (const row of rows) {
        const seat = seatsByRow[row]?.find(s => s.seatNumber === seatNumber);
        if (seat) {
          total += parseFloat(seat.price);
          break;
        }
      }
    });
    return total;
  };

  const total = calculateTotal();

  // Get seat type styling (background and border colors)
  const getSeatTypeStyle = (seatType, isSelected, isSold) => {
    if (isSold) {
      return 'bg-gray-800/50 cursor-not-allowed text-gray-600 border border-white/5';
    }
    
    if (isSelected) {
      return 'bg-red-600 text-white border-2 border-red-400 shadow-lg shadow-red-500/50';
    }

    // Different background colors for each seat type
    switch (seatType) {
      case 'NORMAL':
        return 'bg-blue-500/20 text-blue-200 border-2 border-blue-500/50 hover:bg-blue-500/30 hover:border-blue-400';
      case 'PRIME':
        return 'bg-purple-500/20 text-purple-200 border-2 border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-400';
      case 'RECLINER':
        return 'bg-yellow-500/20 text-yellow-200 border-2 border-yellow-500/50 hover:bg-yellow-500/30 hover:border-yellow-400';
      default:
        return 'bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20';
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Theaters
        </button>
        
        <div className="flex flex-col items-end">
           <h3 className="text-white font-bold">{theater?.name}</h3>
           <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
              <span className="flex items-center gap-1"><CalendarIcon size={14} className="text-red-500"/> {date}</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-red-500"/> {time}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e1e1e] p-8 rounded-3xl border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-2">Select Your Seats</h2>
          <p className="text-gray-400 text-sm mb-4">
            {layoutType} Screen • {availableSeats}/{totalSeats} seats available
          </p>
          
          <div className="mb-12 relative px-10">
            <div className="h-16 w-full bg-gradient-to-b from-red-500/20 to-transparent rounded-[50%] blur-xl absolute -top-10 left-0"></div>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent relative z-10"></div>
            <p className="text-center text-red-500/80 text-xs mt-4 uppercase tracking-[0.3em] font-semibold">Cinema Screen</p>
          </div>

          {/* Dynamic Seat Grid - Scrollable Container */}
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto mb-6 px-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <div className="flex flex-col items-center gap-3 py-4">
              {rows.map(row => (
                <div key={row} className="flex items-center gap-2">
                  {/* Row Label */}
                  <span className="text-gray-500 font-bold text-sm w-6 text-center">{row}</span>
                  
                  {/* Seats in this row */}
                  <div className="flex gap-2">
                    {seatsByRow[row]?.map(seat => {
                      const isSold = seat.status !== 'AVAILABLE';
                      const isSelected = selectedSeats.includes(seat.seatNumber);

                      return (
                        <button
                          key={seat.seatId}
                          disabled={isSold}
                          onClick={() => onSeatClick(seat.seatNumber)}
                          className={`
                            w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center relative overflow-hidden rounded-lg text-xs font-semibold
                            transition-all duration-200
                            ${getSeatTypeStyle(seat.seatType, isSelected, isSold)}
                          `}
                          title={`${seat.seatNumber} - ${seat.seatType} - $${seat.price}`}
                        >
                          {isSelected && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                          <span className={isSold ? 'opacity-30' : 'opacity-90'}>{seat.seatNumber.replace(row, '')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            {/* Status Legend */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Status</p>
              <div className="flex justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-blue-500/20 border-2 border-blue-500/50"></div> 
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-red-600 border-2 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> 
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-gray-800/50 border border-white/5"></div> 
                  <span>Sold</span>
                </div>
              </div>
            </div>
            
            {/* Seat Type Pricing */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Seat Types & Pricing</p>
              <div className="flex justify-center gap-6 text-sm">
                {Object.entries(priceMap).map(([seatType, price]) => {
                  let colorClass = '';
                  switch (seatType) {
                    case 'NORMAL':
                      colorClass = 'bg-blue-500/20 border-blue-500/50 text-blue-300';
                      break;
                    case 'PRIME':
                      colorClass = 'bg-purple-500/20 border-purple-500/50 text-purple-300';
                      break;
                    case 'RECLINER':
                      colorClass = 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
                      break;
                  }
                  
                  return (
                    <div key={seatType} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-lg border-2 ${colorClass}`}></div>
                      <span className="text-white font-medium">{seatType}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-400 font-semibold">${parseFloat(price).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/10 sticky top-28">
            <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Theater</span>
                <span className="text-white text-right w-1/2 truncate font-medium">{theater?.name}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Date & Time</span>
                <span className="text-white font-medium">{date} | {time}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Screen Type</span>
                <span className="text-white font-medium">{layoutType}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Seats</span>
                <span className="text-white text-right font-medium">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-3xl font-bold text-red-500 drop-shadow-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onPayment}
              disabled={selectedSeats.length === 0}
              className={`
                w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                ${selectedSeats.length === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
                }
              `}
            >
              <CreditCard size={20} /> Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingView;

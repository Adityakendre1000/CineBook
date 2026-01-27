import React from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CreditCard } from 'lucide-react';

const BookingView = ({ 
  movie, 
  theater, 
  date, 
  time, 
  selectedSeats, 
  occupiedSeats, 
  onSeatClick, 
  onBack, 
  onPayment, 
  ticketPrice 
}) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const total = selectedSeats.length * ticketPrice;

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
          <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
          <p className="text-gray-400 text-sm mb-10">Select your preferred seats</p>
          
          <div className="mb-12 relative px-10">
            <div className="h-16 w-full bg-gradient-to-b from-red-500/20 to-transparent rounded-[50%] blur-xl absolute -top-10 left-0"></div>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent relative z-10"></div>
            <p className="text-center text-red-500/80 text-xs mt-4 uppercase tracking-[0.3em] font-semibold">Cinema Screen</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-8 gap-3 sm:gap-4">
              {rows.map(row => (
                cols.map(col => {
                  const seatId = `${row}${col}`;
                  const isSold = occupiedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      disabled={isSold}
                      onClick={() => onSeatClick(seatId)}
                      className={`
                        flex items-center justify-center relative overflow-hidden
                        ${isSold 
                          ? 'bg-gray-800/50 cursor-not-allowed text-gray-600 border border-white/5' 
                          : isSelected 
                            ? 'bg-red-600 text-white border border-red-400' 
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5 hover:border-white/20'
                        }
                      `}
                    >
                      {isSelected && <div className="absolute inset-0 bg-white/20"></div>}
                      <span className={isSold ? 'opacity-30' : 'opacity-80'}>{row}{col}</span>
                    </button>
                  );
                })
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-8 text-sm text-gray-400 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-white/20 border border-white/10"></div> Available</div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div> Selected</div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-gray-800/50 border border-white/5"></div> Sold</div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/10 sticky top-28">
            <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Movie</span>
                <span className="text-white text-right w-1/2 truncate font-medium">{movie.title}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Theater</span>
                <span className="text-white text-right w-1/2 truncate font-medium">{theater?.name}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Date & Time</span>
                <span className="text-white font-medium">{date} | {time}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Ticket Price</span>
                <span className="text-white font-medium">${ticketPrice.toFixed(2)}</span>
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
                  : 'bg-red-600 hover:bg-red-500 text-white'
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

import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`
            pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 animate-in slide-in-from-right-full
            ${toast.type === 'success' 
              ? 'bg-[#1e1e1e] border-green-500/50 text-white' 
              : toast.type === 'error' 
                ? 'bg-[#1e1e1e] border-red-500/50 text-white'
                : 'bg-[#1e1e1e] border-yellow-500/50 text-white'
            }
          `}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : toast.type === 'error' ? (
            <AlertCircle className="text-red-500" size={20} />
          ) : (
            <AlertCircle className="text-yellow-500" size={20} />
          )}
          <div>
            <h4 className={`font-bold text-sm ${
              toast.type === 'success' ? 'text-green-400' : 
              toast.type === 'error' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Notice'}
            </h4>
            <p className="text-sm text-gray-300">{toast.message}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

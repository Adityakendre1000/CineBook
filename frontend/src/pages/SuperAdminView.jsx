import React, { useState } from 'react';
import { ShieldCheck, Building2, MapPin, Check, X } from 'lucide-react';
import { MOCK_REQUESTS } from '../data/mockData';

const SuperAdminView = ({ addToast }) => {
  // Local state for visual interactions
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleStatusUpdate = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    
    if (newStatus === 'Active') {
      addToast('Theater registration approved', 'success');
    } else {
      addToast('Theater registration rejected', 'error');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 animate-fade-in">
       <div className="flex items-center gap-5 border-b border-white/10 pb-6">
        <div className="p-4 bg-red-600/10 rounded-2xl border border-red-500/20">
           <ShieldCheck size={40} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-white">System Administration</h2>
          <p className="text-gray-400 text-lg mt-1">Review theater registrations and manage system access.</p>
        </div>
      </div>

      {/* reg. request table */}
      <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
        <div className="px-8 py-6 border-b border-white/10 bg-black/20 flex justify-between items-center">
          <h3 className="font-bold text-xl text-white">Registration Requests</h3>
          <span className="text-xs font-bold bg-white/10 text-white px-3 py-1 rounded-full border border-white/10">
            {requests.filter(r => r.status === 'Pending').length} Pending
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-gray-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-8 py-5">Theater Name</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Date Requested</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-white/5 transition-colors text-sm">
                  <td className="px-8 py-5 font-bold text-white flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 border border-white/5">
                      <Building2 size={18} />
                    </div>
                    {req.name}
                  </td>
                  <td className="px-8 py-5 text-gray-300">
                    <div className="flex items-center gap-2">
                       <MapPin size={16} className="text-red-500" /> {req.location}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-400 font-mono">{req.date}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border
                      ${req.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        req.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'}
                    `}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleStatusUpdate(req.id, 'Active')}
                          className="p-2 hover:bg-green-500/20 rounded-lg text-green-400 transition-colors border border-transparent hover:border-green-500/30"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors border border-transparent hover:border-red-500/30"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-600 italic text-xs">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminView;

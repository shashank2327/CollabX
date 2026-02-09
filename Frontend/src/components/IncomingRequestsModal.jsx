import React from 'react';
import { X, Check, X as XIcon } from 'lucide-react';

const IncomingRequestsModal = ({ isOpen, onClose, requests, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#006D77] text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            Incoming Requests
            <span className="bg-white text-[#006D77] text-xs px-2 py-0.5 rounded-full">
              {requests.length}
            </span>
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {requests.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No pending requests at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <img 
                      src={req.requesterId.avatarUrl || "https://via.placeholder.com/40"} 
                      alt={req.requesterId.name}
                      className="w-12 h-12 rounded-full object-cover bg-white border border-gray-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{req.requesterId.name}</h4>
                      <p className="text-xs text-gray-500">@{req.requesterId.githubUsername}</p>
                      
                      {/* Show Message if exists */}
                      {req.message && (
                        <div className="mt-2 text-sm text-gray-600 italic bg-white p-2 rounded border border-gray-100">
                           "{req.message}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => onAccept(req._id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                      <Check size={16} /> Accept
                    </button>
                    <button
                      onClick={() => onReject(req._id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                      <XIcon size={16} /> Reject
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default IncomingRequestsModal;
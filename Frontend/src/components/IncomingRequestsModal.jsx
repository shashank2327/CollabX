import React from 'react';
import { X, Check, X as XIcon, MessageSquare } from 'lucide-react';

const IncomingRequestsModal = ({ isOpen, onClose, requests, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-brand-graphite rounded-2xl shadow-2xl border border-brand-border w-full max-w-2xl overflow-hidden max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center bg-brand-primary text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare size={20} /> Incoming Requests
            <span className="bg-white text-brand-primary text-xs px-2 py-0.5 rounded-full font-bold ml-1">
              {requests.length}
            </span>
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-brand-graphite">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-brand-muted">
              No pending requests at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="bg-black/30 border border-brand-border rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-brand-primary/30 transition-colors">
                  
                  {/* User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={req.requesterId.avatarUrl || "https://via.placeholder.com/40"} 
                      alt={req.requesterId.name}
                      className="w-12 h-12 rounded-full object-cover bg-black border border-brand-border"
                    />
                    <div>
                      <h4 className="font-bold text-white text-lg">{req.requesterId.name}</h4>
                      <p className="text-xs text-brand-muted">@{req.requesterId.githubUsername}</p>
                      
                      {/* Show Message if exists */}
                      {req.message && (
                        <div className="mt-2 text-sm text-gray-300 italic bg-white/5 p-3 rounded-lg border border-white/5 relative">
                           <span className="absolute -left-1.5 top-3 w-3 h-3 bg-brand-graphite transform rotate-45 border-l border-b border-white/5"></span>
                           "{req.message}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => onAccept(req._id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                      <Check size={16} /> Accept
                    </button>
                    <button
                      onClick={() => onReject(req._id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
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
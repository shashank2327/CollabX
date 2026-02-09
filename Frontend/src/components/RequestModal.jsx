import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const RequestModal = ({ isOpen, onClose, onSubmit, isLoading, postTitle }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-brand-graphite rounded-2xl shadow-2xl border border-brand-border w-full max-w-lg overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center bg-black/20">
          <h3 className="text-lg font-bold text-white">Request to Contribute</h3>
          <button 
            onClick={onClose}
            className="text-brand-muted hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-sm text-brand-muted mb-1">Project:</p>
            <p className="font-bold text-brand-primary truncate text-lg">{postTitle}</p>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-300 block">
              Message to Owner <span className="text-brand-muted font-normal">(Optional)</span>
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'd love to work on this. I have experience with..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white placeholder-gray-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none text-sm"
            />
            <p className="text-xs text-brand-muted">
              Briefly explain why you're a good fit for this project.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-brand-muted font-medium hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : (
                <>
                  <Send size={16} /> Send Request
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RequestModal;
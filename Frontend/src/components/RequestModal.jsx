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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Request to Contribute</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Project:</p>
            <p className="font-semibold text-[#006D77] truncate">{postTitle}</p>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 block">
              Message to Owner <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'd love to work on this. I have experience with..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none transition-all resize-none text-sm"
            />
            <p className="text-xs text-gray-400">
              Briefly explain why you're a good fit for this project.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-[#006D77] hover:bg-[#00555D] text-white font-bold shadow-md shadow-teal-900/10 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
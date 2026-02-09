import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Collab<span className="text-brand-primary">X</span>
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-brand-muted hover:text-white transition-colors"
          >
            Log in
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
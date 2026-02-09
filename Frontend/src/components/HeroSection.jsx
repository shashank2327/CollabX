import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, Zap, Rocket } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-black">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none opacity-60 animate-pulse"></div>
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-graphite border border-brand-border text-brand-primary text-xs font-bold uppercase tracking-wider mb-8 shadow-sm hover:border-brand-primary/40 transition-colors cursor-default">
          <Sparkles size={12} /> v1.0 Public Beta is Live
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-2xl">
          Don't build alone. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-red-500">
            Ship software together.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate community for developers to find teammates, join hackathons, and launch open-source projects. Stop waiting, start building.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-brand-black font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Start Collaborating <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => navigate('/feed')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-graphite border border-brand-border text-white font-bold text-lg hover:border-brand-primary/50 transition-all hover:bg-white/5"
          >
            Explore Projects
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-16 pt-8 border-t border-brand-border/50 flex flex-wrap justify-center gap-8 text-brand-muted opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <span className="flex items-center gap-2 font-semibold"><Globe size={18}/> 500+ Developers</span>
           <span className="flex items-center gap-2 font-semibold"><Zap size={18}/> 100+ Projects</span>
           <span className="flex items-center gap-2 font-semibold"><Rocket size={18}/> 50+ Colleges</span>
        </div>

      </div>
    </header>
  );
};

export default HeroSection;
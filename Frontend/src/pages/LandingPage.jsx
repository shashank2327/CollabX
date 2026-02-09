import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-primary/30">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
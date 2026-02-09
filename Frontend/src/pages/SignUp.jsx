import React, { useContext, useState } from 'react';
import signupImg from '../assets/signup.jpg';
import toast from "react-hot-toast";
import api from "../lib/axios";
import { API_PATHS } from "../lib/apiPath";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../context/userContext';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeEmail: '',
    password: '',
  });

  const { updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        collegeEmail: formData.collegeEmail,
      };

      const response = await api.post(API_PATHS.AUTH.SIGNUP, payload);
      const { token } = response.data;

      if (token) {
        updateUser(response.data);
        toast.success("Welcome to the community! 🚀");
        navigate("/feed");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Signup Failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-brand-black">
      
      {/* LEFT SIDE (Image + Overlay) */}
      <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
        <img 
          src={signupImg} 
          alt="Signup Background" 
          className="object-cover w-full h-full opacity-80 scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-black/30 to-brand-black z-0"></div>
        
        <div className="absolute bottom-20 left-12 max-w-xl z-10">
          <h2 className="text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Build <span className="text-brand-primary">together.</span>
          </h2>
          <div className="border-l-4 border-brand-primary pl-6 backdrop-blur-sm">
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Join the community of developers building the future.
            </p>
            <p className="text-xl text-white font-medium mt-2">
              Find your team. Ship your project.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 bg-brand-black relative">
        
        {/* --- BACK BUTTON (Top Left of Form) --- */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-brand-muted hover:text-white transition-colors font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Home
        </button>

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
              Collab<span className="text-brand-primary">X</span>
            </h1>
            <p className="text-brand-muted text-lg">Create your account to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="John Doe"
                value={formData.fullName} 
                onChange={handleChange} 
                className="w-full px-4 py-3.5 rounded-xl bg-brand-graphite border border-brand-border text-white placeholder-gray-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="john@example.com"
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3.5 rounded-xl bg-brand-graphite border border-brand-border text-white placeholder-gray-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">College Email</label>
              <input 
                type="email" 
                name="collegeEmail" 
                placeholder="john@college.edu"
                value={formData.collegeEmail} 
                onChange={handleChange} 
                className="w-full px-4 py-3.5 rounded-xl bg-brand-graphite border border-brand-border text-white placeholder-gray-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••"
                value={formData.password} 
                onChange={handleChange} 
                className="w-full px-4 py-3.5 rounded-xl bg-brand-graphite border border-brand-border text-white placeholder-gray-500 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-6 transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-primary hover:text-orange-400 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
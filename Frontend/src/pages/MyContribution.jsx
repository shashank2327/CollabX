import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, HeartHandshake, ExternalLink, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const MyContribution = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(API_PATHS.HELP_POST.MY_CONTRIBUTIONS);
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load your contributions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-brand-black relative">
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <HeartHandshake className="text-brand-primary" size={32} /> 
              My Contributions <Sparkles className="text-brand-primary opacity-50" size={20}/>
            </h1>
            <p className="text-brand-muted mt-2 ml-11 text-lg">
              Projects where you are an official team member.
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="text-brand-primary animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            // Empty State
            <div className="text-center py-20 bg-brand-graphite rounded-3xl border border-dashed border-brand-border shadow-xl">
              <div className="w-20 h-20 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-border">
                <HeartHandshake size={36} className="text-brand-muted" />
              </div>
              <h3 className="text-xl font-bold text-white">No contributions yet</h3>
              <p className="text-brand-muted mt-2 max-w-md mx-auto text-lg">
                You haven't been accepted into any projects yet. Go to the Feed and make a request!
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 mt-8 text-brand-primary font-bold hover:text-orange-400 transition-colors bg-brand-primary/10 px-6 py-3 rounded-xl border border-brand-primary/20"
              >
                Go to Feed <ExternalLink size={18} />
              </a>
            </div>
          ) : (
            // Grid of Projects
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="flex flex-col relative group">
                   
                   {/* Collaborative Badge */}
                   <div className="absolute -top-3 -right-2 bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/30 z-20 flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                      <HeartHandshake size={12} /> TEAM MEMBER
                   </div>

                   <HelpPostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyContribution;
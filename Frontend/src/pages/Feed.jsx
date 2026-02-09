import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, Search, Sparkles } from 'lucide-react';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(API_PATHS.HELP_POST.FEED);
        setPosts(response.data.posts || []);
      } catch (err) {
        console.error("Feed Error:", err);
        setError("Failed to load feed. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    // Main Background is now Graphite to match the theme depth
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-brand-black relative">
        {/* Subtle Graphite Gradient Blob for depth */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-graphite/50 to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                Community Feed <Sparkles className="text-brand-primary" size={24} />
              </h1>
              <p className="text-brand-muted mt-2 text-lg">
                Find open projects and start contributing today.
              </p>
            </div>
            
            {/* Search Bar - now using Graphite background */}
            <div className="relative w-full md:w-80 group">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-graphite border border-brand-border text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={20} />
            </div>
          </div>

          {/* --- CONTENT AREA --- */}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 size={48} className="text-brand-primary animate-spin mb-4" />
              <p className="text-brand-muted font-medium animate-pulse">Loading opportunities...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl border border-red-500/20 text-center max-w-lg mx-auto mt-10">
              <p className="font-semibold">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-brand-graphite rounded-3xl border border-dashed border-brand-border max-w-2xl mx-auto mt-10 shadow-xl">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-border">
                <Search className="text-brand-muted" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">No open posts found</h3>
              <p className="text-brand-muted mt-2">Be the first to create a request!</p>
            </div>
          ) : (
            // GRID LAYOUT
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {posts.map((post, index) => (
                <div 
                  key={post._id} 
                  className="animate-fadeIn" 
                  style={{ animationDelay: `${index * 50}ms` }}
                >
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

export default Feed;
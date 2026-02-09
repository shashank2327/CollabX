import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, Search } from 'lucide-react';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        // Using the exact path you provided: HELP_POST.FEED
        const response = await api.get(API_PATHS.HELP_POST.FEED);
        
        // Backend returns: { count: number, posts: [...] }
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
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
              <p className="text-gray-500 mt-1">Find open projects and start contributing.</p>
            </div>
            
            {/* Optional Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none w-full md:w-64 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* --- CONTENT AREA --- */}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 size={40} className="text-[#006D77] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading opportunities...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-700">No open posts found</h3>
              <p className="text-gray-500 mt-2">Be the first to create a request!</p>
            </div>
          ) : (
            // GRID LAYOUT FOR CARDS
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts.map((post) => (
                <HelpPostCard key={post._id} post={post} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Feed;
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, HeartHandshake, ExternalLink } from 'lucide-react';
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
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <HeartHandshake className="text-[#006D77]" size={32} /> 
              My Contributions
            </h1>
            <p className="text-gray-500 mt-1 ml-11">
              Projects where your request was accepted and you are now a team member.
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="text-[#006D77] animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            // Empty State
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-700">No contributions yet</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                You haven't been accepted into any projects yet. Go to the Feed and make a request!
              </p>
              <a 
                href="/feed" 
                className="inline-flex items-center gap-2 mt-6 text-[#006D77] font-semibold hover:underline"
              >
                Go to Feed <ExternalLink size={16} />
              </a>
            </div>
          ) : (
            // Grid of Projects
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="flex flex-col relative group">
                   
                   {/* Collaborative Badge */}
                   <div className="absolute -top-2 -right-2 bg-[#006D77] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20 flex items-center gap-1">
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
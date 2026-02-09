import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { UserContext } from '../context/userContext';
import { Loader2, Trash2, Archive, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const MyClosedPosts = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Closed Posts
  const fetchClosedPosts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(API_PATHS.HELP_POST.MY_CLOSED);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load closed posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedPosts();
  }, []);

  // Handle Delete
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to permanently delete this post?")) return;
    
    try {
      await api.delete(API_PATHS.HELP_POST.DELETE(postId));
      toast.success("Post deleted successfully");
      setPosts(posts.filter(p => p._id !== postId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-brand-black relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Archive className="text-brand-muted" size={32} /> 
              Closed Posts
            </h1>
            <p className="text-brand-muted mt-1 ml-11">
              History of your completed or cancelled requests.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="text-brand-primary animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-brand-graphite rounded-3xl border border-dashed border-brand-border">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-border">
                  <Archive className="text-brand-muted" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">No closed posts</h3>
              <p className="text-brand-muted mt-2">You don't have any archived projects yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                
                // Inject current user data so "Unknown User" doesn't appear
                const postWithUser = {
                  ...post,
                  ownerId: user 
                };

                return (
                  <div key={post._id} className="flex flex-col gap-3 group">
                     {/* Opacity effect for closed posts */}
                     <div className="relative flex-1 opacity-70 group-hover:opacity-100 transition-all duration-300">
                        <HelpPostCard post={postWithUser} />
                     </div>
                     
                     {/* Delete Button - Styled for Dark Mode */}
                     <button
                        onClick={() => handleDeletePost(post._id)}
                        className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 py-3 rounded-xl text-sm font-semibold border border-red-500/20 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Trash2 size={16} /> Delete Permanently
                      </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyClosedPosts;
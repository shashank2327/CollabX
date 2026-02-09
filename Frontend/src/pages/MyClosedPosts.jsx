import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { UserContext } from '../context/userContext';
import { Loader2, Trash2, Archive } from 'lucide-react';
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
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Archive className="text-gray-400" size={32} /> 
              Closed Posts
            </h1>
            <p className="text-gray-500 mt-1 ml-11">
              History of your completed or cancelled requests.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="text-[#006D77] animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl font-bold text-gray-700">No closed posts</h3>
              <p className="text-gray-500 mt-2">You don't have any archived projects yet.</p>
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
                     {/* FIX: Removed the absolute 'CLOSED' badge div. 
                        The HelpPostCard already displays the status based on post.status 
                     */}
                     <div className="relative flex-1 opacity-80 group-hover:opacity-100 transition-all duration-300">
                        <HelpPostCard post={postWithUser} />
                     </div>
                     
                     {/* Delete Button */}
                     <button
                        onClick={() => handleDeletePost(post._id)}
                        className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-xl text-sm font-semibold border border-red-200 flex items-center justify-center gap-2 transition-colors"
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
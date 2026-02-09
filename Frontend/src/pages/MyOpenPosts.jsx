import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HelpPostCard from '../components/HelpPostCard';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { UserContext } from '../context/userContext';
import { Loader2, Trash2, CheckCircle, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

const MyOpenPosts = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch My Open Posts
  const fetchMyPosts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(API_PATHS.HELP_POST.MY_OPEN);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load your posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Handle Close Post
  const handleClosePost = async (postId) => {
    if (!window.confirm("Are you sure you want to close this post? It will move to Closed Posts.")) return;

    try {
      await api.patch(API_PATHS.HELP_POST.CLOSE(postId));
      toast.success("Post closed successfully!");
      fetchMyPosts(); // Refresh list to remove the closed post
    } catch (error) {
      console.error("Close Error:", error);
      toast.error("Failed to close post.");
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;

    try {
      await api.delete(API_PATHS.HELP_POST.DELETE(postId));
      toast.success("Post deleted successfully!");
      setPosts(posts.filter(p => p._id !== postId)); // Remove immediately from UI
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Open Posts</h1>
            <p className="text-gray-500 mt-1">Manage your active requests and collaborations.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="text-[#006D77] animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl font-bold text-gray-700">No open posts</h3>
              <p className="text-gray-500 mt-2">You haven't created any requests yet.</p>
              <button 
                onClick={() => navigate('/create-post')}
                className="mt-4 px-6 py-2 bg-[#006D77] text-white rounded-lg font-semibold hover:bg-[#00555D] transition-colors"
              >
                Create New Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                
                // FIX: Inject current user as owner to prevent "Unknown User"
                const postWithUser = {
                  ...post,
                  ownerId: user 
                };

                return (
                  <div key={post._id} className="flex flex-col gap-3 group">
                    {/* Card Component */}
                    <div className="flex-1">
                      <HelpPostCard post={postWithUser} />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => navigate(`/edit-post/${post._id}`)}
                        className="flex items-center justify-center px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2.5 rounded-xl transition-colors border border-blue-200"
                        title="Edit Post"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* CLOSE BUTTON */}
                      <button
                        onClick={() => handleClosePost(post._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-emerald-200"
                      >
                        <CheckCircle size={18} /> Close
                      </button>
                      
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="flex items-center justify-center px-4 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-xl transition-colors border border-red-200"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default MyOpenPosts;
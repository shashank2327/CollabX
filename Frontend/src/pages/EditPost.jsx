import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, Save, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expectedContribution: '',
    techStack: '', // We'll manage this as a comma-separated string for input
    githubRepoUrl: ''
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(API_PATHS.HELP_POST.GET_ONE(id));
        const post = response.data.helpPost;
        
        setFormData({
          title: post.title,
          description: post.description,
          expectedContribution: post.expectedContribution || '',
          techStack: post.techStack.join(', '), // Convert array to string for input
          githubRepoUrl: post.githubRepoUrl || ''
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load post data.");
        navigate('/open-posts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // 2. Handle Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Convert comma string back to array for API
      const techArray = formData.techStack.split(',').map(t => t.trim()).filter(t => t);

      const payload = {
        ...formData,
        techStack: techArray
      };

      await api.put(API_PATHS.HELP_POST.UPDATE(id), payload);
      
      toast.success("Post updated successfully!");
      navigate('/open-posts'); // Go back to list
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAFA]">
        <Loader2 size={40} className="text-[#006D77] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-3xl mx-auto">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#006D77] mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} /> Cancel Editing
          </button>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/20 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Expected Contribution */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Expected Contribution</label>
                <textarea
                  name="expectedContribution"
                  rows="3"
                  value={formData.expectedContribution}
                  onChange={handleChange}
                  placeholder="What specifically do you need help with?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/20 outline-none transition-all"
                />
              </div>

              {/* Repo URL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">GitHub Repository URL</label>
                <input
                  type="url"
                  name="githubRepoUrl"
                  value={formData.githubRepoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/20 outline-none transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-xl font-bold bg-[#006D77] text-white hover:bg-[#00555D] shadow-lg shadow-teal-900/20 transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditPost;
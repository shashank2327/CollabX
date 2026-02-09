import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { Loader2, Save, ArrowLeft, X, Type, FileText, HelpCircle, Code2, Github } from 'lucide-react';
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
    techStack: '', 
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
          techStack: post.techStack.join(', '), 
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
      const techArray = formData.techStack.split(',').map(t => t.trim()).filter(t => t);

      const payload = {
        ...formData,
        techStack: techArray
      };

      await api.put(API_PATHS.HELP_POST.UPDATE(id), payload);
      
      toast.success("Post updated successfully!");
      navigate('/open-posts'); 
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-black">
        <Loader2 size={40} className="text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-brand-black">
        <div className="max-w-3xl mx-auto">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-brand-muted hover:text-brand-primary mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} /> Cancel Editing
          </button>

          <div className="bg-brand-graphite rounded-3xl border border-brand-border shadow-xl p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Type size={18} className="text-brand-primary" /> Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <FileText size={18} className="text-brand-primary" /> Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Expected Contribution */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <HelpCircle size={18} className="text-brand-primary" /> Expected Contribution
                </label>
                <textarea
                  name="expectedContribution"
                  rows="3"
                  value={formData.expectedContribution}
                  onChange={handleChange}
                  placeholder="What specifically do you need help with?"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Code2 size={18} className="text-brand-primary" /> Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>

              {/* Repo URL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Github size={18} className="text-brand-primary" /> GitHub Repository URL
                </label>
                <input
                  type="url"
                  name="githubRepoUrl"
                  value={formData.githubRepoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-brand-border text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-brand-border mt-8">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-xl font-bold text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-xl font-bold bg-brand-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 disabled:opacity-70"
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
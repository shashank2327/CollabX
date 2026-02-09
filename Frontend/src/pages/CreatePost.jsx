import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import toast from 'react-hot-toast';
import { 
  X, 
  Github, 
  Type, 
  FileText, 
  Code2, 
  HelpCircle, 
  Send,
  Sparkles
} from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubRepoUrl: '',
    expectedContribution: '',
  });

  // Tech Stack State
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState('');

  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tech Stack Tag Logic
  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' && techInput.trim() !== '') {
      e.preventDefault();
      const newTech = techInput.trim();
      if (!techStack.includes(newTech)) {
        setTechStack([...techStack, newTech]);
      }
      setTechInput('');
    }
  };

  const removeTech = (techToRemove) => {
    setTechStack(techStack.filter((tech) => tech !== techToRemove));
  };

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (techStack.length === 0) {
      toast.error('Please add at least one Tech Stack tag (e.g., React)');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        techStack: techStack,
        githubRepoUrl: formData.githubRepoUrl,
        expectedContribution: formData.expectedContribution,
      };

      const response = await api.post(API_PATHS.HELP_POST.CREATE, payload);

      if (response.data) {
        toast.success('Help Post created successfully!');
        navigate('/feed'); 
      }
    } catch (error) {
      console.error('Create Post Error:', error);
      const msg = error.response?.data?.message || 'Failed to create post';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-brand-black relative">
         {/* Subtle Gradient for Depth */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              Create a Request <Sparkles className="text-brand-primary" size={24} />
            </h1>
            <p className="text-brand-muted mt-2 text-lg">
              Ask for help, find contributors, or start a new collaboration.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-brand-graphite rounded-2xl shadow-xl border border-brand-border overflow-hidden p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Type size={18} className="text-brand-primary" />
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI-Powered Chatbot"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-brand-border text-white placeholder-gray-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                  required
                />
              </div>

              {/* Tech Stack (Tag Input) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Code2 size={18} className="text-brand-primary" />
                  Tech Stack <span className="text-red-500">*</span>
                </label>
                <div className="w-full px-4 py-3 rounded-xl border border-brand-border bg-black/40 focus-within:ring-1 focus-within:ring-brand-primary focus-within:border-brand-primary flex flex-wrap gap-2 min-h-[56px] items-center transition-all">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 animate-fadeIn"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                    placeholder={techStack.length === 0 ? "Type tech (e.g. React) and press Enter" : "Add more..."}
                    className="flex-1 min-w-[150px] outline-none bg-transparent text-white text-sm py-1 placeholder-gray-500"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">
                  Press <kbd className="font-mono bg-zinc-800 px-1 rounded text-gray-400">Enter</kbd> to add a tag.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <FileText size={18} className="text-brand-primary" />
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project, the problem it solves, and its current status..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-brand-border text-white placeholder-gray-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Expected Contribution */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <HelpCircle size={18} className="text-brand-primary" />
                  Expected Contribution
                </label>
                <textarea
                  name="expectedContribution"
                  rows="3"
                  value={formData.expectedContribution}
                  onChange={handleChange}
                  placeholder="What specific help do you need? (e.g. Fix bug #12, Design Landing Page)"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-brand-border text-white placeholder-gray-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none"
                />
              </div>

              {/* GitHub Repo URL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Github size={18} className="text-brand-primary" />
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  name="githubRepoUrl"
                  value={formData.githubRepoUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-brand-border text-white placeholder-gray-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-brand-border mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99] group"
                >
                  {isLoading ? (
                    'Creating...'
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" /> Post Request
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CreatePost;
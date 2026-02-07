import React, { useState, useRef, useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Camera, Save, X, Github, Mail, School, User, Link as LinkIcon } from 'lucide-react';
import toast from "react-hot-toast";
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { UserContext } from '../context/userContext';

const Profile = () => {
  const { user, updateUser, loading } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initial Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeEmail: "",
    githubUsername: "",
    githubProfileUrl: "",
    bio: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80");
  const [avatarFile, setAvatarFile] = useState(null);

  // 1️⃣ Populate Form Data when User is Loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "", 
        collegeEmail: user.collegeEmail || "", 
        githubUsername: user.githubUsername || "",
        githubProfileUrl: user.githubProfileUrl || "",
        bio: user.bio || "",
      });
      
      setSkills(Array.isArray(user.skills) ? user.skills : []);
      
      if (user.avatarUrl) {
        setAvatarPreview(user.avatarUrl);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // 2️⃣ Handle Save & Update Context
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('bio', formData.bio);
      data.append('githubUsername', formData.githubUsername);
      data.append('githubProfileUrl', formData.githubProfileUrl);
      
      skills.forEach((skill) => data.append('skills', skill)); 

      if (avatarFile) {
        data.append('image', avatarFile); 
      }

      const response = await api.patch(API_PATHS.USER.UPDATE_PROFILE, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.user) {
        // IMPORTANT: Update the global context with the fresh data
        updateUser(response.data.user);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      const msg = error.response?.data?.message || "Failed to update profile.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Show Loading while we fetch user data on refresh
  if (loading) {
      return <div className="flex h-screen items-center justify-center text-[#006D77] font-semibold">Loading Profile...</div>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 overflow-y-auto">
        <div className="relative h-48 bg-gradient-to-r from-[#006D77] to-[#83C5BE]">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="relative -mt-24 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={handleImageClick} className="absolute bottom-1 right-1 p-2 bg-[#006D77] text-white rounded-full hover:bg-[#00555D] shadow-lg">
                    <Camera size={18} />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>

                <div className="pt-10 sm:pt-12">
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name || "User Name"}</h1>
                  <p className="text-gray-500">{formData.email}</p>
                </div>

                <div className="sm:ml-auto pt-10 sm:pt-4">
                  <button onClick={handleSaveChanges} disabled={isSaving} className="flex items-center gap-2 bg-[#006D77] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#00555D] shadow-sm disabled:opacity-70">
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><User size={16} /> Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006D77] outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Mail size={16} /> Email Address <span className="text-xs text-gray-400 ml-auto">(Read-only)</span></label>
                  <input type="email" value={formData.email} disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><School size={16} /> College Email <span className="text-xs text-gray-400 ml-auto">(Read-only)</span></label>
                  <input type="email" value={formData.collegeEmail} disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Github size={16} /> GitHub Username</label>
                  <input type="text" name="githubUsername" value={formData.githubUsername} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006D77] outline-none" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><LinkIcon size={16} /> GitHub Profile URL</label>
                  <input type="url" name="githubProfileUrl" value={formData.githubProfileUrl} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006D77] outline-none" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Bio</label>
                  <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006D77] outline-none resize-none" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Skills</label>
                  <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-[#006D77] flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-[#E6F0F1] text-[#006D77] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        {skill} <button onClick={() => removeSkill(skill)} className="hover:text-red-500"><X size={14} /></button>
                      </span>
                    ))}
                    <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} placeholder="Type a skill and press Enter" className="flex-1 min-w-[150px] outline-none bg-transparent text-sm py-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
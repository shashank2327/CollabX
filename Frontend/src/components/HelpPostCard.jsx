import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Github, 
  Clock, 
  User, 
  ArrowRight 
} from 'lucide-react';

const HelpPostCard = ({ post }) => {
  const navigate = useNavigate();

  if (!post) return null;

  // Destructure with safety defaults
  const {
    _id,
    title,
    description,
    techStack = [],
    status,
    createdAt,
    githubRepoUrl,
    ownerId, 
  } = post;

  // Handle owner data (it might be populated or just an ID depending on backend)
  // The Feed API usually populates it.
  const ownerName = ownerId?.name || "Unknown User";
  const ownerAvatar = ownerId?.avatarUrl;
  const ownerBio = ownerId?.bio?.substring(0, 30) || "Developer"; // Short bio or placeholder

  const handleViewDetails = () => {
    navigate(`/post/${_id}`);
  };

  // Format Date (e.g. "2 days ago")
  const dateStr = createdAt 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : 'Just now';

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006D77] to-[#83C5BE] opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
            {ownerAvatar ? (
              <img src={ownerAvatar} alt={ownerName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User size={20} />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-none">{ownerName}</h4>
            <span className="text-xs text-gray-500 mt-1 block">{ownerBio}...</span>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
          status === 'OPEN' 
            ? 'bg-[#E6F0F1] text-[#006D77]' 
            : 'bg-gray-100 text-gray-500'
        }`}>
          {status}
        </span>
      </div>

      {/* --- BODY --- */}
      <div className="flex-1">
        {/* Title */}
        <h3 
          onClick={handleViewDetails}
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-[#006D77] transition-colors line-clamp-1"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.slice(0, 3).map((tech, index) => (
            <span 
              key={index} 
              className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{techStack.length - 3} more</span>
          )}
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
        
        {/* Left: Date & GitHub */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {dateStr}
          </span>
          {githubRepoUrl && (
            <a 
              href={githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#006D77] transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} /> Repo
            </a>
          )}
        </div>

        {/* Right: View Button */}
        <button 
          onClick={handleViewDetails}
          className="flex items-center gap-1 text-sm font-bold text-[#006D77] hover:text-[#00555D] transition-colors group/btn"
        >
          View Details 
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default HelpPostCard;
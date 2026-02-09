import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Github, 
  Clock, 
  User, 
  ArrowRight,
  Code2
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

  // Handle owner data
  const ownerName = ownerId?.name || "Unknown User";
  const ownerAvatar = ownerId?.avatarUrl;
  const ownerUsername = ownerId?.githubUsername || "developer";

  const handleViewDetails = () => {
    navigate(`/post/${_id}`);
  };

  // Format Date
  const dateStr = createdAt 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : 'Just now';

  return (
    <div 
      onClick={handleViewDetails}
      // bg-brand-graphite sets the card color to Dark Gray (#18181B)
      className="group relative bg-brand-graphite rounded-2xl p-6 border border-brand-border cursor-pointer transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-brand-primary/30 flex flex-col h-full overflow-hidden"
    >
      
      {/* Background Gradient Blob (Subtle) */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all duration-500 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-black border border-brand-border overflow-hidden flex-shrink-0">
            {ownerAvatar ? (
              <img src={ownerAvatar} alt={ownerName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <User size={20} />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div>
            <h4 className="text-sm font-bold text-white leading-none group-hover:text-brand-primary transition-colors">
              {ownerName}
            </h4>
            <span className="text-xs text-brand-muted mt-1 block">@{ownerUsername}</span>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border ${
          status === 'OPEN' 
            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
        }`}>
          {status}
        </span>
      </div>

      {/* --- BODY --- */}
      <div className="flex-1 relative z-10">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-sm leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.slice(0, 3).map((tech, index) => (
            <span 
              key={index} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 text-gray-300 text-xs font-medium border border-brand-border group-hover:border-brand-primary/30 transition-colors"
            >
              <Code2 size={12} className="text-brand-primary"/> {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2 py-1 text-xs text-brand-muted font-medium self-center">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="pt-4 border-t border-brand-border flex items-center justify-between mt-auto relative z-10">
        
        {/* Left: Date & GitHub */}
        <div className="flex items-center gap-4 text-xs text-brand-muted font-medium">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {dateStr}
          </span>
          {githubRepoUrl && (
            <a 
              href={githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-primary transition-colors flex items-center gap-1.5 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} /> Repo
            </a>
          )}
        </div>

        {/* Right: View Button (Arrow Effect) */}
        <div className="flex items-center gap-1 text-sm font-bold text-brand-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          View Details <ArrowRight size={16} />
        </div>
      </div>

    </div>
  );
};

export default HelpPostCard;
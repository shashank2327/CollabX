import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  BookOpen, 
  CalendarCheck, 
  Users, 
  UserCircle, 
  LogOut,
  Plus 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Feed", icon: LayoutGrid, path: "/feed" },
    { name: "Open Posts", icon: BookOpen, path: "/open-posts" },
    { name: "Closed Posts", icon: CalendarCheck, path: "/closed-posts" },
    { name: "My Contribution", icon: Users, path: "/my-contributions" },
    { name: "My Profile", icon: UserCircle, path: "/profile" },
  ];

  return (
    <aside className="h-screen w-64 bg-brand-graphite border-r border-brand-border flex flex-col fixed left-0 top-0 z-50">
      
      {/* HEADER SECTION (Logo + Create Post) */}
      <div className="p-6">
        
        {/* LOGO - Clickable */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer mb-8 group"
        >
          {/* Logo Icon */}
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Collab<span className="text-brand-primary">X</span>
          </h1>
          <span className="ml-auto bg-brand-primary/10 text-brand-primary text-[9px] px-1.5 py-0.5 rounded border border-brand-primary/20 uppercase font-bold tracking-wider">
            Beta
          </span>
        </div>

        {/* CREATE POST BUTTON */}
        <button 
          onClick={() => navigate('/create-post')}
          className="w-full flex items-center justify-center gap-2 bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-3 rounded-xl transition-all duration-300 font-bold group shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:shadow-glow"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Project</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-brand-gradient text-white shadow-glow font-semibold' 
                  : 'text-brand-muted hover:bg-brand-border hover:text-white'
                }`}
            >
              <Icon 
                size={20} 
                className={`transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} 
              />
              <span className="text-sm">{item.name}</span>
              
              {/* Active Dot Indicator (Optional Polish) */}
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-brand-border">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
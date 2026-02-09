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
    { name: "Feed", icon: LayoutGrid, path: "/" },
    { name: "Open Posts", icon: BookOpen, path: "/open-posts" },
    { name: "Closed Posts", icon: CalendarCheck, path: "/closed-posts" },
    { name: "My Contribution", icon: Users, path: "/my-contributions" },
    // "Requested Post" removed from here
    { name: "My Profile", icon: UserCircle, path: "/profile" },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 shadow-sm">
      
      {/* HEADER SECTION (Logo + Create Post) */}
      <div className="p-5 flex flex-col gap-4">
        
        {/* LOGO BOX - Clickable & Styled */}
        <div 
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-[#006D77] to-[#004e56] p-4 rounded-xl shadow-lg shadow-teal-900/20 cursor-pointer group hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1 z-10">
            Collab<span className="text-[#4FD1C5]">X</span>
          </h1>
          <span className="absolute top-2 right-2 bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded-[4px] uppercase font-bold tracking-wider backdrop-blur-sm border border-white/10">
            Beta
          </span>
        </div>

        {/* CREATE POST BUTTON */}
        <button 
          onClick={() => navigate('/create-post')}
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#006D77] text-[#006D77] hover:bg-[#006D77] hover:text-white py-3 rounded-xl transition-all duration-300 font-bold shadow-sm hover:shadow-md group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon; // Component assignment for cleaner rendering
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? 'bg-[#E6F0F1] text-[#006D77] font-bold shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
            >
              {/* Active Indicator Line */}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#006D77] rounded-r-full"></div>}

              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-colors ${isActive ? 'text-[#006D77]' : 'text-gray-400 group-hover:text-gray-600'}`} 
              />
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Log out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
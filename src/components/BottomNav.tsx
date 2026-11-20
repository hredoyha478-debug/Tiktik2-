import React from 'react';
import { Home, Radio, Music, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadInboxCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  unreadInboxCount
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1 grid grid-cols-5 items-center h-16 shadow-lg">
      <button
        onClick={() => setActiveTab('feed')}
        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          activeTab === 'feed' ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      <button
        onClick={() => setActiveTab('live')}
        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          activeTab === 'live' ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Radio className="w-5 h-5 mb-1 text-rose-500 animate-pulse" />
        <span className="text-[10px] tracking-tight">LIVE</span>
      </button>

      <button
        onClick={() => setActiveTab('sounds')}
        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          activeTab === 'sounds' ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Music className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Sounds</span>
      </button>

      <button
        onClick={() => setActiveTab('inbox')}
        className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          activeTab === 'inbox' ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Inbox</span>
        {unreadInboxCount > 0 && (
          <span className="absolute top-0 right-3 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {unreadInboxCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          activeTab === 'profile' ? 'text-rose-500 font-bold' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <User className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Profile</span>
      </button>
    </nav>
  );
};

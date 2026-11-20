import React from 'react';
import { Search, Plus, Radio, Music, BarChart2, MessageCircle, User } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCreate: () => void;
  unreadInboxCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate,
  unreadInboxCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between transition-colors">
      {/* Brand / Logo */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-slate-900 dark:text-white"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-rose-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shadow-rose-500/20">
            ♪
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-rose-600 to-slate-900 dark:from-white dark:via-rose-400 dark:to-white bg-clip-text text-transparent">
            TikTok
          </span>
        </button>

        {/* Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'feed'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'live'
                ? 'bg-white dark:bg-slate-800 text-rose-500 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            LIVE
          </button>
          <button
            onClick={() => setActiveTab('sounds')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'sounds'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            Sounds
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'studio'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Creator Studio
          </button>
        </nav>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search accounts & sounds..."
            className="w-full bg-slate-100 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all border border-transparent dark:border-slate-800"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-rose-500/25 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        {/* Inbox Button */}
        <button
          onClick={() => setActiveTab('inbox')}
          className={`relative p-2 rounded-xl transition-all ${
            activeTab === 'inbox'
              ? 'bg-rose-500/10 text-rose-500'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
          title="Inbox"
        >
          <MessageCircle className="w-5 h-5" />
          {unreadInboxCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {unreadInboxCount}
            </span>
          )}
        </button>

        {/* Profile Button */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`p-1 rounded-xl transition-all ${
            activeTab === 'profile' ? 'ring-2 ring-rose-500' : 'hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
          title="Profile"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="Profile Avatar"
            className="w-7 h-7 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

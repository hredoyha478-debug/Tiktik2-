import React, { useState } from 'react';
import { User, Grid, Heart, Bookmark, Edit3, Settings, Play } from 'lucide-react';
import { Reel } from '../types/tiktok';

interface ProfileViewProps {
  reels: Reel[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({ reels }) => {
  const [profileTab, setProfileTab] = useState<'videos' | 'liked' | 'saved'>('videos');

  const myVideos = reels.slice(0, 3);
  const likedVideos = reels.filter((r) => r.isLiked);
  const savedVideos = reels.filter((r) => r.isSaved);

  const displayedVideos =
    profileTab === 'videos' ? myVideos : profileTab === 'liked' ? likedVideos : savedVideos;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 text-white min-h-[calc(100vh-60px)] space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
          alt="Your Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-rose-500 shadow-xl"
        />
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-2xl font-black">Alex Creator ✨</h1>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
              @alex_creator
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-md">
            Creating viral short videos & tech reviews! 🚀 | Collabs: dm@alexcreator.com
          </p>
          <div className="flex items-center justify-center md:justify-start gap-6 pt-2 text-xs">
            <div>
              <span className="font-bold text-base text-white">142</span> <span className="text-slate-400">Following</span>
            </div>
            <div>
              <span className="font-bold text-base text-white">45.2K</span> <span className="text-slate-400">Followers</span>
            </div>
            <div>
              <span className="font-bold text-base text-white">892.4K</span> <span className="text-slate-400">Likes</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all">
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center border-b border-slate-800">
        <button
          onClick={() => setProfileTab('videos')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold border-b-2 transition-all ${
            profileTab === 'videos' ? 'border-rose-500 text-rose-500' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-4 h-4" /> Videos ({myVideos.length})
        </button>
        <button
          onClick={() => setProfileTab('liked')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold border-b-2 transition-all ${
            profileTab === 'liked' ? 'border-rose-500 text-rose-500' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" /> Liked ({likedVideos.length})
        </button>
        <button
          onClick={() => setProfileTab('saved')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold border-b-2 transition-all ${
            profileTab === 'saved' ? 'border-rose-500 text-rose-500' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" /> Saved ({savedVideos.length})
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayedVideos.map((video) => (
          <div
            key={video.id}
            className="relative h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group shadow-lg"
          >
            <video src={video.videoUrl} className="w-full h-full object-cover" muted />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="bg-black/60 px-2 py-1 rounded-lg text-[10px] flex items-center gap-1">
                  <Play className="w-3 h-3 text-rose-500 fill-rose-500" /> {video.likes}
                </span>
              </div>
              <p className="text-xs text-slate-200 line-clamp-2">{video.caption}</p>
            </div>
          </div>
        ))}
        {displayedVideos.length === 0 && (
          <div className="col-span-3 py-16 text-center text-slate-500 text-xs">
            No videos in this tab yet.
          </div>
        )}
      </div>
    </div>
  );
};

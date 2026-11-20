import React from 'react';
import { Music, Play, Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { SoundTrack } from '../types/tiktok';

interface SoundLibraryViewProps {
  sounds: SoundTrack[];
  onUseSound: (sound: SoundTrack) => void;
}

export const SoundLibraryView: React.FC<SoundLibraryViewProps> = ({
  sounds,
  onUseSound
}) => {
  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6 text-white min-h-[calc(100vh-60px)]">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Trending Sounds Hub
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">Discover Viral Audio Tracks</h1>
          <p className="text-sm text-rose-100 max-w-lg">
            Use trending audio tracks to boost your reach and get your videos featured on the For You feed.
          </p>
        </div>
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center animate-spin duration-3000">
          <Music className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Sounds List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Music className="w-5 h-5 text-rose-500" /> Top Viral Audio Tracks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sounds.map((sound) => (
            <div
              key={sound.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-rose-500/50 transition-all shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                  <img
                    src={sound.coverUrl}
                    alt={sound.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 line-clamp-1">{sound.title}</h3>
                  <p className="text-xs text-slate-400">{sound.author}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                    <span>🔥 {sound.uses} videos</span>
                    <span>·</span>
                    <span>⏱ {sound.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUseSound(sound)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
                >
                  Use Sound <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

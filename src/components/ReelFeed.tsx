import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Music, Sparkles, Scissors, Video, Send, X } from 'lucide-react';
import { Reel, SoundTrack } from '../types/tiktok';

interface ReelFeedProps {
  reels: Reel[];
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onOpenDuet: (reel: Reel) => void;
  onOpenStitch: (reel: Reel) => void;
  onOpenSound: (sound: SoundTrack) => void;
}

export const ReelFeed: React.FC<ReelFeedProps> = ({
  reels,
  onToggleLike,
  onToggleSave,
  onOpenDuet,
  onOpenStitch,
  onOpenSound
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [heartAnims, setHeartAnims] = useState<{ id: number; x: number; y: number }[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'sarah_style', text: 'Obsessed with this look!! 🔥', time: '1h ago', likes: 24 },
    { id: 2, user: 'mike_dev', text: 'Where did you get that from? Need one!', time: '3h ago', likes: 12 },
    { id: 3, user: 'luna_dance', text: 'Amazing vibe ✨✨', time: '5h ago', likes: 8 }
  ]);

  const currentReel = reels[currentIndex] || reels[0];

  const handleDoubleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now(), x, y };
    setHeartAnims((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHeartAnims((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);

    if (!currentReel.isLiked) {
      onToggleLike(currentReel.id);
    }
  };

  const handleScrollNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handleScrollPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentReel) {
    return <div className="p-8 text-center text-slate-400">No reels available.</div>;
  }

  return (
    <div className="relative w-full h-[calc(100vh-60px)] bg-black flex items-center justify-center overflow-hidden select-none">
      {/* Main Reel Video Container */}
      <div
        className="relative w-full max-w-md h-full bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl"
        onDoubleClick={handleDoubleTap}
      >
        <video
          key={currentReel.id}
          src={currentReel.videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Floating Hearts Animation */}
        {heartAnims.map((h) => (
          <div
            key={h.id}
            className="absolute text-rose-500 animate-ping pointer-events-none text-6xl drop-shadow-lg"
            style={{ left: h.x - 24, top: h.y - 24 }}
          >
            ❤️
          </div>
        ))}

        {/* Gradient Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Author & Caption Overlay (Bottom Left) */}
        <div className="absolute bottom-6 left-4 right-20 z-20 space-y-3 pointer-events-auto">
          <div className="flex items-center gap-3">
            <img
              src={currentReel.author.avatar}
              alt={currentReel.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white drop-shadow">
                  @{currentReel.author.username}
                </span>
                {currentReel.author.verified && (
                  <span className="text-cyan-400 text-xs font-bold">✓</span>
                )}
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-0.5 rounded-full text-[11px] font-bold shadow-md ml-2 transition-all">
                  Follow
                </button>
              </div>
              <p className="text-xs text-slate-300 font-medium drop-shadow mt-0.5">
                {currentReel.author.name}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-100 font-normal leading-relaxed drop-shadow line-clamp-3">
            {currentReel.caption}
          </p>

          {/* Sound Track Badge */}
          <button
            onClick={() => onOpenSound(currentReel.sound)}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-200 hover:bg-black/60 transition-all"
          >
            <Music className="w-3.5 h-3.5 text-rose-400 animate-spin" />
            <span className="truncate max-w-[200px]">♪ {currentReel.sound.title}</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="absolute bottom-20 right-4 z-20 flex flex-col items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => onToggleLike(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                currentReel.isLiked
                  ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <Heart className={`w-6 h-6 ${currentReel.isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-xs font-bold text-white drop-shadow">
              {currentReel.likes.toLocaleString()}
            </span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow">
              {currentReel.commentsCount}
            </span>
          </button>

          {/* Bookmark / Save */}
          <button
            onClick={() => onToggleSave(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                currentReel.isSaved
                  ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/40'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <Bookmark className={`w-6 h-6 ${currentReel.isSaved ? 'fill-slate-950' : ''}`} />
            </div>
            <span className="text-xs font-bold text-white drop-shadow">
              {currentReel.savesCount}
            </span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center gap-1 group">
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow">
              {currentReel.sharesCount}
            </span>
          </button>

          {/* Duet Trigger */}
          <button
            onClick={() => onOpenDuet(currentReel)}
            className="flex flex-col items-center gap-1 group"
            title="Create Duet"
          >
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-cyan-400 hover:bg-black/60 transition-all">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-white drop-shadow">Duet</span>
          </button>

          {/* Stitch Trigger */}
          <button
            onClick={() => onOpenStitch(currentReel)}
            className="flex flex-col items-center gap-1 group"
            title="Create Stitch"
          >
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-amber-400 hover:bg-black/60 transition-all">
              <Scissors className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-white drop-shadow">Stitch</span>
          </button>

          {/* Spinning Vinyl Music Disc (Bottom Right) */}
          <div className="relative w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 p-1 flex items-center justify-center animate-spin duration-3000 shadow-xl">
            <img
              src={currentReel.sound.coverUrl}
              alt="Vinyl Cover"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute w-3 h-3 rounded-full bg-black border border-slate-500" />
          </div>
        </div>

        {/* Scroll Nav Buttons (Desktop Side Arrows) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-30">
          <button
            onClick={handleScrollPrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white backdrop-blur-md transition-all"
            title="Previous Reel"
          >
            ▲
          </button>
          <button
            onClick={handleScrollNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
            title="Next Reel"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Comments Drawer Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col text-white shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-rose-500" /> {currentReel.commentsCount} Comments
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {commentsList.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 shrink-0 flex items-center justify-center font-bold text-xs text-rose-400">
                    {c.user[0].toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">@{c.user}</span>
                      <span className="text-[10px] text-slate-500">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-300">{c.text}</p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                      <button className="flex items-center gap-1 hover:text-rose-500">
                        <Heart className="w-3 h-3" /> {c.likes}
                      </button>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && commentInput.trim()) {
                    setCommentsList((prev) => [
                      { id: Date.now(), user: 'you', text: commentInput, time: 'Just now', likes: 0 },
                      ...prev
                    ]);
                    setCommentInput('');
                  }
                }}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                onClick={() => {
                  if (commentInput.trim()) {
                    setCommentsList((prev) => [
                      { id: Date.now(), user: 'you', text: commentInput, time: 'Just now', likes: 0 },
                      ...prev
                    ]);
                    setCommentInput('');
                  }
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

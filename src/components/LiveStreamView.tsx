import React, { useState, useEffect } from 'react';
import { Radio, Users, Heart, Send, Gift, Sparkles, MessageCircle, DollarSign, Award } from 'lucide-react';
import { LiveStream } from '../types/tiktok';

interface LiveStreamViewProps {
  liveStreams: LiveStream[];
  onSendGift: (liveId: string, giftName: string, coinCost: number) => void;
}

export const LiveStreamView: React.FC<LiveStreamViewProps> = ({
  liveStreams,
  onSendGift
}) => {
  const [currentLiveIndex, setCurrentLiveIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [coinBalance, setCoinBalance] = useState(1250);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [flyingGifts, setFlyingGifts] = useState<{ id: number; name: string }[]>([]);

  const currentLive = liveStreams[currentLiveIndex] || liveStreams[0];

  const gifts = [
    { name: 'Rose 🌹', cost: 10 },
    { name: 'Coffee ☕', cost: 50 },
    { name: 'Diamond 💎', cost: 100 },
    { name: 'Galaxy 🌌', cost: 500 },
    { name: 'Lion 🦁', cost: 1000 }
  ];

  const handleGiftSelect = (giftName: string, cost: number) => {
    if (coinBalance < cost) {
      alert('Not enough coins! Top up your wallet.');
      return;
    }
    setCoinBalance(coinBalance - cost);
    onSendGift(currentLive.id, giftName, cost);

    // Trigger floating animation
    const newGift = { id: Date.now(), name: giftName };
    setFlyingGifts((prev) => [...prev, newGift]);
    setTimeout(() => {
      setFlyingGifts((prev) => prev.filter((g) => g.id !== newGift.id));
    }, 2000);
  };

  if (!currentLive) {
    return <div className="p-8 text-center text-slate-400">No live streams available right now.</div>;
  }

  return (
    <div className="relative w-full h-[calc(100vh-60px)] bg-black flex flex-col lg:flex-row overflow-hidden text-white">
      {/* Main Stream Player */}
      <div className="relative flex-1 h-full bg-slate-950 flex items-center justify-center overflow-hidden">
        <video
          src={currentLive.videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Top Overlay Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 z-20">
          <img
            src={currentLive.streamer.avatar}
            alt={currentLive.streamer.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-rose-500"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm">{currentLive.streamer.name}</span>
              {currentLive.streamer.verified && (
                <span className="text-cyan-400 text-xs">✓</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-rose-400 font-semibold">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {(currentLive.viewersCount).toLocaleString()} viewers
              </span>
            </div>
          </div>
        </div>

        {/* Stream Title Overlay */}
        <div className="absolute top-20 left-4 right-4 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10 z-20">
          <p className="text-sm font-semibold">{currentLive.title}</p>
        </div>

        {/* Flying Gift Animations */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
          {flyingGifts.map((fg) => (
            <div
              key={fg.id}
              className="absolute bottom-20 animate-bounce bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl text-lg font-black flex items-center gap-2 scale-125 transition-all"
            >
              <span>🎁</span> Sent {fg.name}!
            </div>
          ))}
        </div>

        {/* Stream Switcher Bar */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            {liveStreams.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setCurrentLiveIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
                  currentLiveIndex === idx
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-black/60 text-slate-300 hover:bg-black/80'
                }`}
              >
                Stream #{idx + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">
              {currentLive.diamondsEarned.toLocaleString()} Diamonds
            </span>
          </div>
        </div>
      </div>

      {/* Live Chat & Gift Panel */}
      <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-72 lg:h-full">
        {/* Panel Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-rose-500" /> Live Chat & Gifts
          </h3>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{coinBalance.toLocaleString()} Coins</span>
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentLive.chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2.5 rounded-xl text-xs space-y-1 ${
                msg.isGift
                  ? 'bg-rose-500/15 border border-rose-500/30'
                  : 'bg-slate-950/60 border border-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-semibold text-slate-200">@{msg.user}</span>
                <span className="text-[10px]">{msg.timestamp}</span>
              </div>
              <p className={msg.isGift ? 'font-bold text-rose-400' : 'text-slate-300'}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        {/* Virtual Gifts Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {gifts.map((g) => (
              <button
                key={g.name}
                onClick={() => handleGiftSelect(g.name, g.cost)}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/50 shrink-0 w-20 transition-all active:scale-95"
              >
                <span className="text-xl mb-1">{g.name.split(' ')[1]}</span>
                <span className="text-[10px] font-semibold truncate w-full text-center">{g.name.split(' ')[0]}</span>
                <span className="text-[9px] text-amber-400 font-bold">{g.cost} coins</span>
              </button>
            ))}
          </div>
        </div>

        {/* Send Chat Input */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Say something nice to the live stream..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && commentText.trim()) {
                currentLive.chatMessages.push({
                  id: `c-${Date.now()}`,
                  user: 'You',
                  text: commentText,
                  timestamp: 'Just now'
                });
                setCommentText('');
              }
            }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            onClick={() => {
              if (commentText.trim()) {
                currentLive.chatMessages.push({
                  id: `c-${Date.now()}`,
                  user: 'You',
                  text: commentText,
                  timestamp: 'Just now'
                });
                setCommentText('');
              }
            }}
            className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

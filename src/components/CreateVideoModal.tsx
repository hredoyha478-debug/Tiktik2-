import React, { useState } from 'react';
import { X, Upload, Video, Sparkles, Music } from 'lucide-react';
import { SoundTrack } from '../types/tiktok';

interface CreateVideoModalProps {
  onClose: () => void;
  onPublish: (caption: string, videoUrl: string, sound: SoundTrack) => void;
  sounds: SoundTrack[];
}

export const CreateVideoModal: React.FC<CreateVideoModalProps> = ({
  onClose,
  onPublish,
  sounds
}) => {
  const [caption, setCaption] = useState('Check out my new video! 🔥 #fyp #viral');
  const [selectedSound, setSelectedSound] = useState<SoundTrack>(sounds[0] || {
    id: 's-default',
    title: 'Original Sound',
    author: 'You',
    uses: '1',
    duration: '0:15',
    coverUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
  });
  const [videoUrl, setVideoUrl] = useState(
    'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-with-neon-lights-in-the-background-42993-large.mp4'
  );
  const [isUploading, setIsUploading] = useState(false);

  const sampleVideos = [
    { label: 'Dance Vibe', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-with-neon-lights-in-the-background-42993-large.mp4' },
    { label: 'Cooking', url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-kitchen-43152-large.mp4' },
    { label: 'City Neon', url: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-in-the-dark-42995-large.mp4' },
    { label: 'Acoustic Guitar', url: 'https://assets.mixkit.co/videos/preview/mixkit-musician-playing-the-guitar-in-a-studio-43154-large.mp4' }
  ];

  const handlePublish = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onPublish(caption, videoUrl, selectedSound);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold">Create TikTok Post</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Video Preview */}
          <div className="relative h-60 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
            <video src={videoUrl} className="w-full h-full object-cover" autoPlay muted loop />
            <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-xl text-xs flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-500" />
              <span>Active Video Source</span>
            </div>
          </div>

          {/* Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Choose Video Sample</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleVideos.map((s) => (
                <button
                  key={s.url}
                  onClick={() => setVideoUrl(s.url)}
                  className={`p-2 rounded-xl text-xs font-medium border transition-all ${
                    videoUrl === s.url
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sound Track</label>
            <select
              value={selectedSound.id}
              onChange={(e) => {
                const found = sounds.find((snd) => snd.id === e.target.value);
                if (found) setSelectedSound(found);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {sounds.map((snd) => (
                <option key={snd.id} value={snd.id}>
                  ♪ {snd.title} ({snd.author})
                </option>
              ))}
            </select>
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Caption & Hashtags</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePublish}
              disabled={isUploading}
              className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Posting to TikTok...' : 'Post Now'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

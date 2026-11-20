import React, { useState } from 'react';
import { X, Video, Camera, Play, Sparkles } from 'lucide-react';
import { Reel } from '../types/tiktok';

interface DuetStitchModalProps {
  reel: Reel;
  mode: 'duet' | 'stitch';
  onClose: () => void;
  onPublish: (caption: string, videoUrl: string) => void;
}

export const DuetStitchModal: React.FC<DuetStitchModalProps> = ({
  reel,
  mode,
  onClose,
  onPublish
}) => {
  const [caption, setCaption] = useState(
    mode === 'duet'
      ? `Duet with @${reel.author.username} 🔥 #duet #tiktok`
      : `Stitched from @${reel.author.username} 🧵 #stitch #fyp`
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const handleStartRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecorded(true);
    }, 3000);
  };

  const handlePublishClick = () => {
    onPublish(caption, reel.videoUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold">
              {mode === 'duet' ? 'Create a Duet' : 'Create a Stitch'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="p-6 space-y-4">
          <div className="relative bg-slate-950 rounded-2xl overflow-hidden h-72 flex items-center justify-center border border-slate-800">
            {mode === 'duet' ? (
              // Duet Split Screen Preview
              <div className="grid grid-cols-2 w-full h-full gap-1 p-2">
                <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <video src={reel.videoUrl} className="w-full h-full object-cover" autoPlay muted loop />
                  <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px]">
                    @{reel.author.username}
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border-2 border-dashed border-rose-500/50">
                  {recorded ? (
                    <video src={reel.videoUrl} className="w-full h-full object-cover" autoPlay muted loop />
                  ) : isRecording ? (
                    <div className="text-center space-y-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500 animate-ping mx-auto" />
                      <p className="text-xs text-rose-400 font-medium">Recording Duet...</p>
                    </div>
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <Camera className="w-8 h-8 text-rose-500 mx-auto" />
                      <p className="text-xs text-slate-400">Your camera feed (Split View)</p>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-rose-500/80 px-2 py-0.5 rounded text-[10px]">
                    You (Duet)
                  </span>
                </div>
              </div>
            ) : (
              // Stitch Preview (First 5s source + your clip)
              <div className="w-full h-full flex flex-col justify-between p-3">
                <div className="bg-black/60 p-2 rounded-xl flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-500" />
                  <span className="text-xs truncate">Source: @{reel.author.username} (First 5s clip)</span>
                </div>
                <div className="flex-1 my-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {recorded ? (
                    <p className="text-xs text-emerald-400 font-semibold">Stitch clip recorded successfully! ✅</p>
                  ) : isRecording ? (
                    <p className="text-xs text-rose-500 animate-pulse font-semibold">Recording your reaction clip...</p>
                  ) : (
                    <p className="text-xs text-slate-400">Tap Record to add your reaction stitch</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Caption & Hashtags</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {!recorded && (
              <button
                onClick={handleStartRecord}
                disabled={isRecording}
                className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all"
              >
                <Video className="w-4 h-4" />
                {isRecording ? 'Recording (3s)...' : 'Start Recording'}
              </button>
            )}
            {recorded && (
              <button
                onClick={handlePublishClick}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Publish {mode === 'duet' ? 'Duet' : 'Stitch'}
              </button>
            )}
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

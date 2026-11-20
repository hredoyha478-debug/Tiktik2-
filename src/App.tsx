import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { ReelFeed } from './components/ReelFeed';
import { LiveStreamView } from './components/LiveStreamView';
import { SoundLibraryView } from './components/SoundLibraryView';
import { CreatorStudioView } from './components/CreatorStudioView';
import { InboxView } from './components/InboxView';
import { ProfileView } from './components/ProfileView';
import { DuetStitchModal } from './components/DuetStitchModal';
import { CreateVideoModal } from './components/CreateVideoModal';
import { Reel, LiveStream, SoundTrack, InboxData, CreatorAnalytics } from './types/tiktok';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [reels, setReels] = useState<Reel[]>([]);
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [sounds, setSounds] = useState<SoundTrack[]>([]);
  const [inbox, setInbox] = useState<InboxData>({ notifications: [], chats: [] });
  const [analytics, setAnalytics] = useState<CreatorAnalytics>({
    totalViews: '3.4M',
    profileVisits: '142.8K',
    followerGrowth: '+24.5%',
    engagementRate: '12.4%',
    diamonds: 38450,
    estimatedEarnings: '$384.50'
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [duetStitchModal, setDuetStitchModal] = useState<{ reel: Reel; mode: 'duet' | 'stitch' } | null>(null);

  // Fetch initial data from Express backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [reelsRes, liveRes, soundsRes, inboxRes, analyticsRes] = await Promise.all([
          fetch('/api/reels').then((r) => r.json()),
          fetch('/api/live').then((r) => r.json()),
          fetch('/api/sounds').then((r) => r.json()),
          fetch('/api/inbox').then((r) => r.json()),
          fetch('/api/analytics').then((r) => r.json()),
        ]);

        setReels(reelsRes);
        setLiveStreams(liveRes);
        setSounds(soundsRes);
        setInbox(inboxRes);
        setAnalytics(analyticsRes);
      } catch (err) {
        console.error('Error fetching data from API:', err);
      }
    }
    fetchData();
  }, []);

  const handleToggleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/reels/${id}/like`, { method: 'POST' });
      const updated = await res.json();
      setReels((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      // Fallback local update
      setReels((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 } : r))
      );
    }
  };

  const handleToggleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/reels/${id}/save`, { method: 'POST' });
      const updated = await res.json();
      setReels((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      setReels((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isSaved: !r.isSaved, savesCount: r.isSaved ? r.savesCount - 1 : r.savesCount + 1 } : r))
      );
    }
  };

  const handleSendGift = async (liveId: string, giftName: string, coinCost: number) => {
    try {
      const res = await fetch(`/api/live/${liveId}/gift`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftName, coinCost })
      });
      const updatedLive = await res.json();
      setLiveStreams((prev) => prev.map((l) => (l.id === liveId ? updatedLive : l)));
      setAnalytics((prev) => ({ ...prev, diamonds: prev.diamonds + Math.floor(coinCost / 2) }));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublishReel = async (caption: string, videoUrl: string, sound?: SoundTrack) => {
    try {
      const res = await fetch('/api/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, videoUrl, sound })
      });
      const newReel = await res.json();
      setReels((prev) => [newReel, ...prev]);
      setShowCreateModal(false);
      setDuetStitchModal(null);
      setActiveTab('feed');
    } catch (err) {
      console.error(err);
    }
  };

  const unreadInboxCount = inbox.notifications.filter((n) => n.unread).length +
    inbox.chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white pb-16 lg:pb-0">
      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setShowCreateModal(true)}
        unreadInboxCount={unreadInboxCount}
      />

      {/* Main Content Views */}
      <main>
        {activeTab === 'feed' && (
          <ReelFeed
            reels={reels}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onOpenDuet={(reel) => setDuetStitchModal({ reel, mode: 'duet' })}
            onOpenStitch={(reel) => setDuetStitchModal({ reel, mode: 'stitch' })}
            onOpenSound={() => setActiveTab('sounds')}
          />
        )}

        {activeTab === 'live' && (
          <LiveStreamView liveStreams={liveStreams} onSendGift={handleSendGift} />
        )}

        {activeTab === 'sounds' && (
          <SoundLibraryView sounds={sounds} onUseSound={() => setShowCreateModal(true)} />
        )}

        {activeTab === 'studio' && (
          <CreatorStudioView analytics={analytics} />
        )}

        {activeTab === 'inbox' && (
          <InboxView inbox={inbox} />
        )}

        {activeTab === 'profile' && (
          <ProfileView reels={reels} />
        )}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadInboxCount={unreadInboxCount}
      />

      {/* Create Video Modal */}
      {showCreateModal && (
        <CreateVideoModal
          sounds={sounds}
          onClose={() => setShowCreateModal(false)}
          onPublish={handlePublishReel}
        />
      )}

      {/* Duet / Stitch Modal */}
      {duetStitchModal && (
        <DuetStitchModal
          reel={duetStitchModal.reel}
          mode={duetStitchModal.mode}
          onClose={() => setDuetStitchModal(null)}
          onPublish={handlePublishReel}
        />
      )}
    </div>
  );
}

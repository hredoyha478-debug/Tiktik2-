import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // In-memory data store for TikTok clone
  const dataDir = path.join(__dirname, '.data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbFile = path.join(dataDir, 'tiktok_db.json');

  // Initial Seed Data
  const defaultDb = {
    reels: [
      {
        id: 'reel-1',
        author: {
          username: 'sophia_style',
          name: 'Sophia Miller 👗',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          verified: true,
          followers: '1.2M'
        },
        caption: 'Styling 3 different minimalist outfits for autumn! Which one is your favorite? 🍂✨ #fashion #autumn #style',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-the-camera-in-a-park-41125-large.mp4',
        sound: {
          id: 'sound-1',
          title: 'Original Sound - Sophia Style',
          author: 'Sophia Miller',
          coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
        },
        likes: 142500,
        commentsCount: 1240,
        sharesCount: 8920,
        savesCount: 15400,
        isLiked: false,
        isSaved: false,
        duetEnabled: true,
        stitchEnabled: true,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'reel-2',
        author: {
          username: 'chef_marco',
          name: 'Chef Marco 🍳',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          verified: true,
          followers: '3.8M'
        },
        caption: 'The secret to making restaurant-quality creamy truffle pasta in under 15 minutes! 🍝🔥 #cooking #recipe #foodie',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-kitchen-43152-large.mp4',
        sound: {
          id: 'sound-2',
          title: 'Truffle Beat - Culinary Vibes',
          author: 'DJ Flavour',
          coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        },
        likes: 528900,
        commentsCount: 4310,
        sharesCount: 32100,
        savesCount: 89000,
        isLiked: true,
        isSaved: true,
        duetEnabled: true,
        stitchEnabled: true,
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      },
      {
        id: 'reel-3',
        author: {
          username: 'tech_insider',
          name: 'Tech Insiders ⚡',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          verified: true,
          followers: '850K'
        },
        caption: 'Testing the limits of the new holographic AR glasses in downtown Tokyo! 🕶️🌆 #tech #gadgets #tokyo',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-in-the-dark-42995-large.mp4',
        sound: {
          id: 'sound-3',
          title: 'Cyberpunk Tokyo Synth - FutureSound',
          author: 'NeoPulse',
          coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
        },
        likes: 98200,
        commentsCount: 890,
        sharesCount: 4500,
        savesCount: 12000,
        isLiked: false,
        isSaved: false,
        duetEnabled: true,
        stitchEnabled: true,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'reel-4',
        author: {
          username: 'luna_dancer',
          name: 'Luna Dance 💃',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          verified: true,
          followers: '5.4M'
        },
        caption: 'New choreography to the hottest track! Tag a friend who needs to learn this! 🎶🔥 #dance #choreography #viral',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-with-neon-lights-in-the-background-42993-large.mp4',
        sound: {
          id: 'sound-4',
          title: 'Electric Groove (Remix) - Top Hits',
          author: 'BeatMaster',
          coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
        },
        likes: 1250000,
        commentsCount: 9400,
        sharesCount: 84000,
        savesCount: 210000,
        isLiked: false,
        isSaved: false,
        duetEnabled: true,
        stitchEnabled: true,
        createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
      }
    ],
    liveStreams: [
      {
        id: 'live-1',
        title: 'Late Night Chill & Acoustic Jam 🎸 Live with Fans!',
        streamer: {
          username: 'liam_music',
          name: 'Liam Vance 🎵',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          verified: true
        },
        viewersCount: 14250,
        likesCount: 98400,
        diamondsEarned: 24500,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-musician-playing-the-guitar-in-a-studio-43154-large.mp4',
        chatMessages: [
          { id: 'c-1', user: 'music_lover99', text: 'Play Wonderwall please!', timestamp: 'Just now' },
          { id: 'c-2', user: 'sarah_h', text: 'Your voice is unreal 😍', timestamp: '1s ago' },
          { id: 'c-3', user: 'alex_k', text: 'Sent a Galaxy 🌌✨', timestamp: '2s ago', isGift: true, giftName: 'Galaxy' }
        ]
      },
      {
        id: 'live-2',
        title: 'Gaming Marathon: Speedrunning Retro Classics 🕹️🔥',
        streamer: {
          username: 'pixel_queen',
          name: 'PixelQueen 👾',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
          verified: true
        },
        viewersCount: 28900,
        likesCount: 210400,
        diamondsEarned: 52100,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-controller-while-playing-video-games-41126-large.mp4',
        chatMessages: [
          { id: 'c-21', user: 'gamer_boy', text: 'That boss fight was insane!', timestamp: 'Just now' },
          { id: 'c-22', user: 'emma_w', text: 'Let’s goooo!', timestamp: '3s ago' }
        ]
      }
    ],
    sounds: [
      { id: 'sound-1', title: 'Original Sound - Sophia Style', author: 'Sophia Miller', uses: '142.5K', duration: '0:15', coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
      { id: 'sound-2', title: 'Truffle Beat - Culinary Vibes', author: 'DJ Flavour', uses: '528.9K', duration: '0:30', coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { id: 'sound-3', title: 'Cyberpunk Tokyo Synth - FutureSound', author: 'NeoPulse', uses: '98.2K', duration: '0:20', coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      { id: 'sound-4', title: 'Electric Groove (Remix) - Top Hits', author: 'BeatMaster', uses: '1.25M', duration: '0:45', coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }
    ],
    inbox: {
      notifications: [
        { id: 'notif-1', type: 'like', user: { username: 'chef_marco', name: 'Chef Marco', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }, text: 'liked your video.', time: '2m ago', unread: true },
        { id: 'notif-2', type: 'comment', user: { username: 'luna_dancer', name: 'Luna Dance', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }, text: 'commented: "This is so good!! 🔥"', time: '15m ago', unread: true },
        { id: 'notif-3', type: 'follow', user: { username: 'tech_insider', name: 'Tech Insiders', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }, text: 'started following you.', time: '1h ago', unread: false }
      ],
      chats: [
        { id: 'chat-1', user: { username: 'chef_marco', name: 'Chef Marco', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', online: true }, lastMessage: 'Let’s collab on a cooking reel soon!', time: '10:42 AM', unreadCount: 2 },
        { id: 'chat-2', user: { username: 'luna_dancer', name: 'Luna Dance', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', online: false }, lastMessage: 'Check out the new dance trend!', time: 'Yesterday', unreadCount: 0 }
      ]
    },
    analytics: {
      totalViews: '3.4M',
      profileVisits: '142.8K',
      followerGrowth: '+24.5%',
      engagementRate: '12.4%',
      diamonds: 38450,
      estimatedEarnings: '$384.50'
    }
  };

  function readDb() {
    if (!fs.existsSync(dbFile)) {
      fs.writeFileSync(dbFile, JSON.stringify(defaultDb, null, 2));
    }
    try {
      return JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    } catch {
      return defaultDb;
    }
  }

  function writeDb(data: any) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  }

  // API Routes
  app.get('/api/reels', (req, res) => {
    const db = readDb();
    res.json(db.reels);
  });

  app.post('/api/reels/:id/like', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const reel = db.reels.find((r: any) => r.id === id);
    if (reel) {
      reel.isLiked = !reel.isLiked;
      reel.likes += reel.isLiked ? 1 : -1;
      writeDb(db);
      res.json(reel);
    } else {
      res.status(404).json({ error: 'Reel not found' });
    }
  });

  app.post('/api/reels/:id/save', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const reel = db.reels.find((r: any) => r.id === id);
    if (reel) {
      reel.isSaved = !reel.isSaved;
      reel.savesCount += reel.isSaved ? 1 : -1;
      writeDb(db);
      res.json(reel);
    } else {
      res.status(404).json({ error: 'Reel not found' });
    }
  });

  app.post('/api/reels', (req, res) => {
    const db = readDb();
    const newReel = {
      id: `reel-${Date.now()}`,
      author: req.body.author || {
        username: 'current_user',
        name: 'You ✨',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: false,
        followers: '1.4K'
      },
      caption: req.body.caption || 'My new TikTok reel! #viral #fyp',
      videoUrl: req.body.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-with-neon-lights-in-the-background-42993-large.mp4',
      sound: req.body.sound || db.sounds[0],
      likes: 0,
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      isLiked: false,
      isSaved: false,
      duetEnabled: true,
      stitchEnabled: true,
      createdAt: new Date().toISOString()
    };
    db.reels.unshift(newReel);
    writeDb(db);
    res.json(newReel);
  });

  app.get('/api/live', (req, res) => {
    const db = readDb();
    res.json(db.liveStreams);
  });

  app.post('/api/live/:id/gift', (req, res) => {
    const { id } = req.params;
    const { giftName, coinCost } = req.body;
    const db = readDb();
    const live = db.liveStreams.find((l: any) => l.id === id);
    if (live) {
      live.diamondsEarned += Math.floor(coinCost / 2);
      live.likesCount += coinCost * 10;
      live.chatMessages.push({
        id: `c-${Date.now()}`,
        user: 'You',
        text: `Sent a ${giftName} 🎁 (${coinCost} coins)`,
        timestamp: 'Just now',
        isGift: true,
        giftName
      });
      db.analytics.diamonds += Math.floor(coinCost / 2);
      writeDb(db);
      res.json(live);
    } else {
      res.status(404).json({ error: 'Live stream not found' });
    }
  });

  app.get('/api/sounds', (req, res) => {
    const db = readDb();
    res.json(db.sounds);
  });

  app.get('/api/inbox', (req, res) => {
    const db = readDb();
    res.json(db.inbox);
  });

  app.get('/api/analytics', (req, res) => {
    const db = readDb();
    res.json(db.analytics);
  });

  // Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`TikTok App server running at http://localhost:${PORT}`);
  });
}

startServer();

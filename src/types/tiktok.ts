export interface Author {
  username: string;
  name: string;
  avatar: string;
  verified?: boolean;
  followers?: string;
}

export interface SoundTrack {
  id: string;
  title: string;
  author: string;
  uses: string;
  duration: string;
  coverUrl: string;
}

export interface Reel {
  id: string;
  author: Author;
  caption: string;
  videoUrl: string;
  sound: SoundTrack;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  duetEnabled: boolean;
  stitchEnabled: boolean;
  createdAt: string;
}

export interface LiveStream {
  id: string;
  title: string;
  streamer: Author;
  viewersCount: number;
  likesCount: number;
  diamondsEarned: number;
  videoUrl: string;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isGift?: boolean;
  giftName?: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: Author;
  text: string;
  time: string;
  unread: boolean;
}

export interface ChatThread {
  id: string;
  user: Author & { online?: boolean };
  lastMessage: string;
  time: string;
  unreadCount: number;
}

export interface InboxData {
  notifications: NotificationItem[];
  chats: ChatThread[];
}

export interface CreatorAnalytics {
  totalViews: string;
  profileVisits: string;
  followerGrowth: string;
  engagementRate: string;
  diamonds: number;
  estimatedEarnings: string;
}

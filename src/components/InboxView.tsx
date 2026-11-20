import React, { useState } from 'react';
import { MessageCircle, Bell, Heart, UserPlus, Send, Sparkles } from 'lucide-react';
import { InboxData } from '../types/tiktok';

interface InboxViewProps {
  inbox: InboxData;
}

export const InboxView: React.FC<InboxViewProps> = ({ inbox }) => {
  const [inboxTab, setInboxTab] = useState<'chats' | 'notifications'>('chats');
  const [selectedChat, setSelectedChat] = useState<any | null>(inbox.chats[0] || null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey! Loved your latest video on autumn styling.' },
    { id: 2, sender: 'you', text: 'Thank you so much! Appreciate it 🙌' },
    { id: 3, sender: 'other', text: 'Let’s collab on a cooking reel soon!' }
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'you', text: messageText }]);
    setMessageText('');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 text-white min-h-[calc(100vh-60px)] flex flex-col">
      {/* Header Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black tracking-tight">Inbox</h1>
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setInboxTab('chats')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              inboxTab === 'chats' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Direct Messages
          </button>
          <button
            onClick={() => setInboxTab('notifications')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              inboxTab === 'notifications' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Notifications
          </button>
        </div>
      </div>

      {inboxTab === 'notifications' ? (
        // Notifications list
        <div className="space-y-3">
          {inbox.notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                notif.unread
                  ? 'bg-slate-900 border-rose-500/40 shadow-md shadow-rose-500/5'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={notif.user.avatar}
                    alt={notif.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-rose-500 p-1 rounded-full text-white">
                    {notif.type === 'like' && <Heart className="w-3 h-3 fill-white" />}
                    {notif.type === 'comment' && <MessageCircle className="w-3 h-3" />}
                    {notif.type === 'follow' && <UserPlus className="w-3 h-3" />}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm">{notif.user.name}</span>
                    <span className="text-xs text-slate-400">@{notif.user.username}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{notif.text}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{notif.time}</span>
            </div>
          ))}
        </div>
      ) : (
        // Chats & DM interface
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          {/* Chat threads list */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 h-[500px] overflow-y-auto">
            {inbox.chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  selectedChat?.id === chat.id
                    ? 'bg-rose-500/15 border border-rose-500/40'
                    : 'bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                    )}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-sm text-slate-200">{chat.user.name}</h4>
                    <p className="text-xs text-slate-400 truncate w-40">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500">{chat.time}</span>
                  {chat.unreadCount > 0 && (
                    <span className="block mt-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full mx-auto flex items-center justify-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Active Chat Conversation */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[500px]">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                  <img
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-sm">{selectedChat.user.name}</h3>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2.5 rounded-2xl text-xs ${
                          m.sender === 'you'
                            ? 'bg-rose-500 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Message @${selectedChat.user.username}...`}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                Select a chat thread to start messaging
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { BarChart2, TrendingUp, Users, Eye, Award, DollarSign, ArrowUpRight, Sparkles } from 'lucide-react';
import { CreatorAnalytics } from '../types/tiktok';

interface CreatorStudioViewProps {
  analytics: CreatorAnalytics;
}

export const CreatorStudioView: React.FC<CreatorStudioViewProps> = ({ analytics }) => {
  const stats = [
    { label: 'Total Video Views', value: analytics.totalViews, change: '+18.4%', icon: Eye, color: 'text-cyan-400' },
    { label: 'Profile Visits', value: analytics.profileVisits, change: '+12.1%', icon: Users, color: 'text-rose-400' },
    { label: 'Follower Growth', value: analytics.followerGrowth, change: '+5.2%', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Engagement Rate', value: analytics.engagementRate, change: '+2.8%', icon: BarChart2, color: 'text-amber-400' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6 text-white min-h-[calc(100vh-60px)]">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/15 text-rose-400 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Professional Creator Studio
          </div>
          <h1 className="text-2xl font-black tracking-tight">Analytics & Monetization</h1>
          <p className="text-xs text-slate-400">Track your performance and virtual gift earnings in real-time.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 px-6 py-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Gift Earnings Balance</p>
            <p className="text-xl font-black text-amber-400">
              {analytics.diamonds.toLocaleString()} Diamonds ({analytics.estimatedEarnings})
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{s.value}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Performance Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h2 className="text-lg font-bold">Recent Videos Performance</h2>
        <div className="space-y-3">
          {[
            { title: 'Styling 3 different minimalist outfits for autumn!', views: '420.5K', likes: '142.5K', comments: '1,240' },
            { title: 'The secret to making restaurant-quality creamy truffle pasta!', views: '1.2M', likes: '528.9K', comments: '4,310' },
            { title: 'Testing the limits of the new holographic AR glasses!', views: '280.1K', likes: '98.2K', comments: '890' }
          ].map((v, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200 line-clamp-1">{v.title}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>👀 {v.views} views</span>
                  <span>❤️ {v.likes} likes</span>
                  <span>💬 {v.comments} comments</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full shrink-0">
                Viral 🔥
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

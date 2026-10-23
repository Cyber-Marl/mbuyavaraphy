import React, { useState, useEffect } from 'react';
import { X, Play, Headphones, Bookmark, Check, Share2, Calendar, Clock, Sparkles, Award } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { toast } from 'sonner';

export default function VideoPlayerModal({ episode, onClose }) {
  const [activeTab, setActiveTab] = useState('synopsis'); // 'synopsis' | 'takeaways' | 'guests'
  const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'audio'
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!episode) return null;

  const bookmarked = isInWatchlist(episode.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Broadcast link copied to clipboard!");
    }
  };

  // Convert youtube watch or regular URL to embed URL safely
  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(episode.video_url);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-brand-charcoal rounded-3xl border border-white/10 shadow-2xl overflow-hidden text-white my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-charcoal-card border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-brand-terracotta text-white">
              S{episode.season_number || 1} • Ep {episode.episode_number || 1}
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold text-brand-gold">
              {episode.category_display || episode.category}
            </span>
          </div>

          {/* Media Player Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setMediaMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  mediaMode === 'video' ? 'bg-brand-terracotta text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video</span>
              </button>
              <button
                onClick={() => setMediaMode('audio')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  mediaMode === 'audio' ? 'bg-brand-gold text-brand-charcoal' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Headphones className="w-3 h-3" />
                <span>Audio Podcast</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Frame (Video or Audio Player) */}
        <div className="relative bg-black aspect-video w-full">
          {mediaMode === 'video' ? (
            <iframe
              src={embedUrl}
              title={episode.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-brand-charcoal via-brand-charcoal-card to-black text-center space-y-6">
              <div className="relative">
                <img
                  src={episode.thumbnail_url || '/logo.jpg'}
                  alt={episode.title}
                  className="w-36 h-36 rounded-2xl object-cover shadow-2xl border-2 border-brand-gold"
                />
                <span className="absolute -bottom-2 -right-2 p-2 rounded-full bg-brand-gold text-brand-charcoal shadow-lg">
                  <Headphones className="w-5 h-5" />
                </span>
              </div>
              <div className="space-y-2 max-w-lg">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase">
                  Mbuya Va Raphy Audio Podcast Stream
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white line-clamp-1">
                  {episode.title}
                </h3>
                <p className="text-xs text-gray-400">
                  Broadcast audio edition • {episode.duration || '48 mins'}
                </p>
              </div>

              {/* Simulated Audio Wave Player Bar */}
              <div className="w-full max-w-md bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>14:20</span>
                  <div className="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-brand-gold rounded-full"></div>
                  </div>
                  <span>{episode.duration || '54:00'}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-xs text-brand-stone font-semibold">
                    Streaming via The Mbuya Va Raphy Podcast Network
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Episode Info & Tabbed Drawer */}
        <div className="p-6 sm:p-8 space-y-6 bg-brand-charcoal">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {episode.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  {episode.air_date ? new Date(episode.air_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Season 2'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-terracotta" />
                  {episode.duration || '45 mins'}
                </span>
                {episode.view_count > 0 && (
                  <>
                    <span>•</span>
                    <span>{episode.view_count.toLocaleString()} broadcast views</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start">
              <button
                onClick={() => toggleWatchlist(episode.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  bookmarked
                    ? 'bg-brand-gold text-brand-charcoal border-brand-gold font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/20'
                }`}
              >
                {bookmarked ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{bookmarked ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs for Details */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('synopsis')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'synopsis'
                  ? 'bg-white/10 text-brand-gold-light border-b-2 border-brand-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Broadcast Synopsis
            </button>
            <button
              onClick={() => setActiveTab('takeaways')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'takeaways'
                  ? 'bg-white/10 text-brand-gold-light border-b-2 border-brand-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Key Clinical Takeaways
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'guests'
                  ? 'bg-white/10 text-brand-gold-light border-b-2 border-brand-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Featured Experts ({episode.guests?.length || 0})
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="text-sm text-gray-300 leading-relaxed min-h-[160px]">
            {activeTab === 'synopsis' && (
              <div className="space-y-4 whitespace-pre-line">
                <p>{episode.synopsis || episode.description}</p>
              </div>
            )}

            {activeTab === 'takeaways' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Clinical Action Points for Diaspora Families
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-white text-xs mb-1">1. Early Screening & Validation</p>
                    <p className="text-xs text-gray-400">Seeking neurodevelopmental assessment without fear of stigma provides children with early accommodations.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-white text-xs mb-1">2. Overcoming Cultural Isolation</p>
                    <p className="text-xs text-gray-400">Navigating foreign healthcare frameworks requires community allyship rather than solitary suffering.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-white text-xs mb-1">3. Parental Mental Health</p>
                    <p className="text-xs text-gray-400">Caregiver burnout is real; parents must replenish their own emotional reservoirs through therapy and rest.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-white text-xs mb-1">4. Faith & Clinical Synergy</p>
                    <p className="text-xs text-gray-400">Spiritual prayer and psychiatric intervention are mutually reinforcing pathways to holistic family healing.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guests' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {episode.guests && episode.guests.length > 0 ? (
                  episode.guests.map((guest, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <img
                        src={guest.avatar_url || guest.avatar || '/host_portrait.jpg'}
                        alt={guest.name}
                        className="w-14 h-14 rounded-full object-cover border border-brand-gold flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm">{guest.name}</h4>
                        <p className="text-xs text-brand-gold">{guest.title_profession}</p>
                        <p className="text-xs text-gray-400 line-clamp-2">{guest.bio}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs italic">Hosted by Melody Magengezha with guest contributors.</p>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Play, Clock, Bookmark, Check, Users, Eye } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function EpisodeCard({ episode, onPlay }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const bookmarked = isInWatchlist(episode.id);

  const categoryColorMap = {
    mental_health: 'bg-brand-sage text-white border-brand-sage',
    relationships: 'bg-brand-terracotta text-white border-brand-terracotta',
    culture_family: 'bg-brand-gold-dark text-white border-brand-gold',
    diaspora_voice: 'bg-[#3B5998] text-white border-[#3B5998]',
    youth_wellness: 'bg-brand-terracotta-dark text-white border-brand-terracotta',
  };

  const categoryBadgeClass = categoryColorMap[episode.category] || 'bg-brand-charcoal text-white';

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-brand-border overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-brand-charcoal">
        <img
          src={episode.thumbnail_url || episode.thumbnail || '/featured_flyer.jpg'}
          alt={episode.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Episode Code Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-brand-charcoal/90 text-white backdrop-blur-md border border-white/10">
            S{episode.season_number || 1} • Ep {episode.episode_number || 1}
          </span>
          {episode.is_featured && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-charcoal">
              Featured
            </span>
          )}
        </div>

        {/* Watchlist Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(episode.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-brand-terracotta text-white shadow-md'
              : 'bg-black/50 text-white/90 hover:bg-black/80 hover:text-brand-gold'
          }`}
          aria-label={bookmarked ? "Remove from watchlist" : "Add to watchlist"}
          title={bookmarked ? "In your watchlist" : "Save for later"}
        >
          {bookmarked ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Duration & Views at Bottom of Thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            {episode.duration || '45 mins'}
          </span>
          {episode.view_count > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px]">
              <Eye className="w-3 h-3 text-brand-stone" />
              {episode.view_count.toLocaleString()} views
            </span>
          )}
        </div>

        {/* Center Hover Play Icon */}
        <div
          onClick={() => onPlay(episode)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-brand-terracotta text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category Chip */}
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${categoryBadgeClass}`}>
            {episode.category_display || episode.category}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onPlay(episode)}
          className="font-serif text-lg font-bold text-brand-charcoal group-hover:text-brand-terracotta transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {episode.title}
        </h3>

        {/* Short Synopsis Hook */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
          {episode.description}
        </p>

        {/* Guests Avatars / Names */}
        {episode.guests && episode.guests.length > 0 && (
          <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {episode.guests.map((guest, idx) => (
                  <img
                    key={idx}
                    src={guest.avatar_url || guest.avatar || '/host_portrait.jpg'}
                    alt={guest.name}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    title={`${guest.name} (${guest.title_profession})`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-charcoal truncate max-w-[150px]">
                {episode.guests.map(g => g.name).join(', ')}
              </span>
            </div>
            
            <button
              onClick={() => onPlay(episode)}
              className="text-xs font-bold text-brand-terracotta hover:text-brand-terracotta-dark flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              Watch <Play className="w-3 h-3 fill-current" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

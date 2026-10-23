import React, { useState, useMemo } from 'react';
import { Search, Filter, Bookmark, Sparkles, X, Tv } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import { useWatchlist } from '../context/WatchlistContext';

export default function EpisodeHub({ episodes, onPlayEpisode, activeCategory, setActiveCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { watchlist, watchlistCount } = useWatchlist();

  const categories = [
    { id: 'all', label: 'All Episodes' },
    { id: 'mental_health', label: 'Mental Health' },
    { id: 'relationships', label: 'Marriage & Family' },
    { id: 'culture_family', label: 'Culture & Faith' },
    { id: 'diaspora_voice', label: 'Diaspora Voice' },
    { id: 'youth_wellness', label: 'Youth & Neurodiversity' },
    { id: 'watchlist', label: `My Watchlist (${watchlistCount})`, isSpecial: true },
  ];

  const filteredEpisodes = useMemo(() => {
    return episodes.filter((ep) => {
      // Category / Watchlist filter
      if (activeCategory === 'watchlist') {
        if (!watchlist.includes(ep.id)) return false;
      } else if (activeCategory !== 'all') {
        if (ep.category !== activeCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = ep.title.toLowerCase().includes(q);
        const matchesDesc = ep.description.toLowerCase().includes(q);
        const matchesGuest = ep.guests?.some(g => g.name.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesGuest;
      }

      return true;
    });
  }, [episodes, activeCategory, searchQuery, watchlist]);

  return (
    <section id="episodes" className="py-16 sm:py-24 bg-brand-stone/40 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-border">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30">
              <Tv className="w-3.5 h-3.5" />
              Episode Hub & Media Library
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
              Broadcast Archive & Masterclasses
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Empowering clinical counseling, lived diaspora narratives, and cultural wellness. Stream on-demand anytime.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic, theme, or guest..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full text-sm bg-white border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 focus:border-brand-terracotta transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-charcoal text-white shadow-md'
                    : 'bg-white text-brand-charcoal hover:bg-brand-stone border border-brand-border'
                } ${cat.isSpecial && activeCategory === cat.id ? 'bg-brand-terracotta text-white' : ''}`}
              >
                {cat.isSpecial && <Bookmark className="inline-block w-3.5 h-3.5 mr-1.5" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Episodes Grid */}
        {filteredEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onPlay={onPlayEpisode}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-brand-border p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-stone flex items-center justify-center text-brand-terracotta">
              <Tv className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              No Broadcast Episodes Found
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {activeCategory === 'watchlist'
                ? "Your watchlist is currently empty. Bookmark episodes using the bookmark icon to save them for later."
                : `We could not find any episodes matching "${searchQuery}". Try searching for another keyword or selecting a different category.`}
            </p>
            {(searchQuery || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-charcoal text-white hover:bg-brand-terracotta transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

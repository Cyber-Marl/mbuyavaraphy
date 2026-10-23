import React from 'react';
import { Play, Calendar, Clock, Globe, Sparkles, Bookmark, Share2, Check } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { toast } from 'sonner';

export default function HeroBroadcast({ episode, onPlayVideo }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const bookmarked = episode ? isInWatchlist(episode.id) : false;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Broadcast link copied to clipboard!");
    }
  };

  if (!episode) return null;

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#142C10] via-[#1E3E18] to-[#0D1F0B] text-white">
      {/* Ambient background lighting using logo colors (amber ochre & botanical green) */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] rounded-full bg-brand-amber/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[500px] h-[500px] rounded-full bg-brand-green-bright/25 blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(35,68,26,0.35)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Broadcast Badge & Season Tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-amber to-brand-amber-dark text-white shadow-md shadow-brand-amber/30">
                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
                Season 2 Premiere
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#22431A]/70 text-brand-amber-pale border border-brand-amber/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                Featured 5-Part Masterclass
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-brand-green-tint/90 bg-white/10 border border-white/15">
                54 mins
              </span>
            </div>

            {/* Headline Title */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-brand-amber-light uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-0.5 bg-brand-amber"></span>
                Mbuya Va Raphy Talk Show Presents
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-tight tracking-tight text-white">
                Parenting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DE] via-brand-amber to-[#F5BA6A]">Neurodiversity</span>
              </h1>
              <p className="font-display italic text-lg sm:text-xl text-brand-green-tint/95">
                Lived experience and professional insights across developmental stages
              </p>
            </div>

            {/* Multi-timezone Broadcast Schedule Pill */}
            <div className="bg-[#0F220C]/85 rounded-2xl p-4 sm:p-5 border border-brand-amber/35 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-amber-light">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-amber" />
                  Thurs 25 June 2026 • Session 1: Pre-Natal Stage
                </span>
                <span className="text-brand-amber-pale/80 font-semibold tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-light animate-pulse"></span>
                  Join Us Live
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-white font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-brand-amber" />
                  <span><strong>7:00 PM</strong> Melbourne (AUS)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-brand-amber/15 px-3 py-1.5 rounded-xl border border-brand-amber/30 text-brand-amber-pale">
                  <Globe className="w-3.5 h-3.5 text-brand-amber" />
                  <span><strong>11:00 AM</strong> Zimbabwe</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <Globe className="w-3.5 h-3.5 text-brand-green-light" />
                  <span><strong>10:00 AM</strong> UK</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-brand-green-tint/85 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {episode.description}
            </p>

            {/* Speakers Chips */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-brand-green-light/20">
              <div className="flex items-center gap-2.5">
                <img
                  src="/host_portrait.jpg"
                  alt="Melody Magengezha"
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-amber shadow-sm"
                />
                <div>
                  <p className="text-xs font-bold text-white leading-none">Melody Magengezha</p>
                  <p className="text-[11px] text-brand-amber font-medium mt-0.5">Host • Mental Health Specialist</p>
                </div>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="flex items-center gap-2.5">
                <img
                  src="/featured_flyer.jpg"
                  alt="Rachael Masiboy"
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-green-bright shadow-sm"
                />
                <div>
                  <p className="text-xs font-bold text-white leading-none">Rachael Masiboy</p>
                  <p className="text-[11px] text-brand-green-tint/75 font-medium mt-0.5">Guest Clinician • Forensic Psychologist</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onPlayVideo(episode)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-amber via-[#F0A349] to-brand-amber-dark hover:from-brand-amber-dark hover:to-brand-amber text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-brand-amber/35 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Episode Trailer</span>
              </button>

              <button
                onClick={() => toggleWatchlist(episode.id)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold border transition-all ${
                  bookmarked
                    ? 'bg-brand-amber/25 text-brand-amber-pale border-brand-amber shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/20 backdrop-blur-sm'
                }`}
              >
                {bookmarked ? (
                  <>
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all shadow-sm"
                title="Share broadcast"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Broadcast Poster Frame */}
          <div className="lg:col-span-5">
            <div className="relative group cursor-pointer" onClick={() => onPlayVideo(episode)}>
              {/* Outer decorative glow frame in logo colors */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-amber via-brand-green-bright to-brand-green-leaf rounded-3xl blur-lg opacity-40 group-hover:opacity-85 transition duration-500"></div>

              {/* Poster Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#10220D] border-2 border-brand-amber/35 shadow-2xl">
                <img
                  src="/featured_flyer.jpg"
                  alt="Parenting Neurodiversity Flyer"
                  className="w-full h-auto max-h-[520px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Overlay with Play Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F0B] via-[#0E1F0B]/35 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded bg-[#0E1D0A]/85 backdrop-blur-sm text-[11px] font-bold tracking-wider text-brand-amber-pale uppercase border border-brand-amber/35 mb-1.5">
                        5 Sessions Series
                      </span>
                      <p className="text-white font-serif font-bold text-lg leading-tight">
                        Session 1: Pre-Natal Stage
                      </p>
                    </div>
                    
                    {/* Pulsing Play Disc */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-amber to-brand-amber-light flex items-center justify-center text-[#0E1D0A] shadow-amber-glow group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

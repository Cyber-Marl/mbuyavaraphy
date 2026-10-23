import React, { useState, useEffect } from 'react';
import { Menu, X, Bookmark, HeartHandshake, Play, PhoneCall, Sparkles } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function Navbar({ onWatchLatest, onSelectWatchlistTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { watchlistCount } = useWatchlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Episodes', href: '#episodes' },
    { name: 'Meet Melody', href: '#meet-mbuya' },
    { name: 'Advice Corner', href: '#advice-corner' },
    { name: 'Guest Experts', href: '#guest-experts' },
    { name: 'Partnerships', href: '#sponsorship' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-md py-2 border-b border-brand-border'
          : 'bg-brand-cream/90 backdrop-blur-md py-2.5 sm:py-3 border-b border-brand-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative flex-shrink-0">
              <img
                src="/logo.png"
                alt="Mbuya Va Raphy Talk Show - Health & Wellness Matters"
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain filter drop-shadow-md group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
              />
              <span className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-brand-amber ring-2 ring-white shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-brand-charcoal group-hover:text-brand-green-forest transition-colors">
                  Mbuya va Raphy
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-amber/15 text-brand-amber-dark border border-brand-amber/30 tracking-wider">
                  TALK SHOW
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-brand-green uppercase flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
                Health & Wellness Matters
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-brand-charcoal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-green transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-amber hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Watchlist Counter */}
            <button
              onClick={onSelectWatchlistTab}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-brand-stone text-brand-charcoal hover:bg-brand-amber/10 hover:text-brand-amber-dark border border-brand-border transition-all"
              title="View your saved episodes"
            >
              <Bookmark className="w-3.5 h-3.5 text-brand-amber" />
              <span>Watchlist</span>
              {watchlistCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-brand-amber text-white font-bold">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* Crisis Hotline Quick Access */}
            <a
              href="#crisis-support"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-brand-green/10 text-brand-green-forest hover:bg-brand-green hover:text-white border border-brand-green/20 transition-all shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce text-brand-green" />
              <span>Crisis Support</span>
            </a>

            {/* Watch Premiere CTA */}
            <button
              onClick={onWatchLatest}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-amber to-brand-amber-dark hover:from-brand-amber-dark hover:to-brand-amber text-white shadow-md hover:shadow-amber-glow transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Latest</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onSelectWatchlistTab}
              className="relative p-2 rounded-full text-brand-charcoal hover:bg-brand-stone"
              aria-label="Watchlist"
            >
              <Bookmark className="w-5 h-5 text-brand-gold" />
              {watchlistCount > 0 && (
                <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] bg-brand-terracotta text-white font-bold">
                  {watchlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-charcoal hover:bg-brand-stone transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-cream border-b border-brand-border px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-brand-charcoal hover:bg-brand-stone hover:text-brand-green transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-border flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWatchLatest();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-amber to-brand-amber-dark text-white font-bold text-sm uppercase tracking-wider shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Season 2 Premiere
            </button>
            <a
              href="#crisis-support"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-green/10 text-brand-green-forest font-semibold text-sm border border-brand-green/20"
            >
              <PhoneCall className="w-4 h-4 text-brand-green" />
              24/7 Crisis Helplines
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

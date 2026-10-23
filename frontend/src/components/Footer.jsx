import React, { useState } from 'react';
import { Youtube, Facebook, Headphones, Send, Sparkles, Heart } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);
    try {
      await subscribeNewsletter(email.trim());
      toast.success("Welcome! You are now subscribed to Mbuya Va Raphy's private broadcast circle.");
      setEmail('');
    } catch (err) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-12 border-t border-brand-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Mbuya Va Raphy Talk Show - Health & Wellness Matters"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain filter drop-shadow-lg"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Mbuya va Raphy
                </span>
                <span className="text-xs font-semibold text-brand-amber uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green-light"></span>
                  Talk Show • Health & Wellness Matters
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-stone/75 max-w-sm leading-relaxed">
              Empowering African diaspora families with clinical mental health expertise, neurodiversity advocacy, and compassionate generational healing. Hosted by Melody Magengezha.
            </p>
            
            {/* Streaming Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-all text-gray-300"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-gray-300"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-green-600 hover:text-white transition-all text-gray-300"
                aria-label="Spotify Podcast"
              >
                <Headphones className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Broadcast Sections
            </h4>
            <ul className="space-y-2 text-sm text-brand-stone/80 font-medium">
              <li>
                <a href="#episodes" className="hover:text-brand-gold transition-colors">
                  Episode Library
                </a>
              </li>
              <li>
                <a href="#meet-mbuya" className="hover:text-brand-gold transition-colors">
                  Meet Melody Magengezha
                </a>
              </li>
              <li>
                <a href="#advice-corner" className="hover:text-brand-gold transition-colors">
                  Confidential Advice Corner
                </a>
              </li>
              <li>
                <a href="#guest-experts" className="hover:text-brand-gold transition-colors">
                  Guest Faculty
                </a>
              </li>
              <li>
                <a href="#sponsorship" className="hover:text-brand-gold transition-colors">
                  Sponsorship & Media Kit
                </a>
              </li>
              <li>
                <a href="#crisis-support" className="hover:text-brand-gold transition-colors">
                  24/7 Crisis Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              The Mbuya Va Raphy Circle
            </h4>
            <p className="text-xs text-brand-stone/75 leading-relaxed">
              Receive private weekly broadcast notifications, session discussion guides, and mental health counseling recaps.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full py-3 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubscribing ? "Subscribing..." : "Join VIP Broadcast Circle"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} The Mbuya VaRaphy Talk Show. All rights reserved.</p>
          <p className="text-center md:text-right max-w-lg leading-relaxed text-[11px]">
            <strong>Disclaimer:</strong> The Mbuya Va Raphy Talk Show provides educational mental wellness guidance. Content does not replace formal clinical assessment or individual medical treatment.
          </p>
        </div>

      </div>
    </footer>
  );
}
